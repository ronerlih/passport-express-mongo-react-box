const passport =require("passport");

module.exports =  function(session, RedisStore, client){
    return session({ 
    //   store: passport.,
      name:'__id',
      secret: process.env.NODE_ENV === 'production' ? process.env.SESSION_PASS : 'keyboard cat' && 'keyboard cat',
      cookie: {httpOnly: false, maxAge: 1000 * 60 * 60 * 24},
      resave: true,
      saveUninitialized: true
    })
  }