import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

function App() {
	const PrivateRoute = ({ component: Component, state }) => <Route render={(props) => (state.authenticated === true ? <Component {...props} /> : state.loading === true ? <div></div> : <Redirect to="/" />)} />;

  const [authenticated, setAuthenticated] = useState(false);
  const handleAuth = (bool) => {
    setAuthenticated(bool)
  }
	return (
		<div>
			<Router>
				<Switch>
          
					<Route exact path="/" render={(props) => <Login {...props} authenticated={authenticated} setAuthenticated={setAuthenticated} />} />

					<Route exact path="/home" component={Home} />

					<Route exact path="/login" render={(props) => <Login {...props} authenticated={authenticated} setAuthenticated={setAuthenticated} />} />

					<Route exact path="/signup" component={Signup} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
