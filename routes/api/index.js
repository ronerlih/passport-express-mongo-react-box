const db = require("../../models");
const router = require("express").Router();

// /api/

router.route("/user/login")
    .post((req, res, next) =>
    {
            console.log("login");
            //validate request
            if (req.body.email && req.body.password) {
              console.log(req.body.email,req.body.password);
              db.User.authenticate(req.body.email, req.body.password, function (error, user) {
                if (error || !user) {
                  var err = new Error('Wrong email or password.');
                  next(err);
                } else {
                  console.log(`login: `, user._id);
                  req.user = user;
                  console.log('redirect');
                  return res.json(user);
                }
              });
            } else {
              var err = new Error('All fields required.');
              err.status = 400;
              return next(err);
            }
        }
);
router.route("/user/signup")
    .post((req, res) => {
        console.log(db)
	// create user in db
	db.User.create({
		email: req.body.email,
		password: req.body.password,
	})
		// redirect to login
		.then(() => {
			res.redirect(307, "/user/api/login");
		})
		.catch((err) => {
			res.status(401).json(err);
		});
});
router.route("/").get((req, res) => res.json({ got: "you" }));

router.route("/user/signout")
    .get((req, res) => {
        // destroy session
        req.session.destroy();
        req.redirect("/api/user/login");
});

module.exports = router;
