import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

function App() {
  
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  
	const ProtectedRoute = ({ component: Component, state }) => <Route render={(props) => (authenticated === true ? <Component {...props} /> : loading === true ? <div></div> : <Redirect to="/" />)} />;
  
  return (
		<div>
			<Router>
				<Switch>
          
					<Route exact path="/" render={(props) => <Login {...props} authenticated={authenticated} setAuthenticated={setAuthenticated} setLoading={setLoading} />} />

					<ProtectedRoute exact path="/home" component={Home} />

					<Route exact path="/login" render={(props) => <Login {...props} authenticated={authenticated} setAuthenticated={setAuthenticated} setLoading={setLoading} />} />

					<Route exact path="/signup" component={Signup} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
