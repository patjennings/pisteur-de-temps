import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Synthesis from './components/Synthesis';
import Admin from './components/Admin';

import {observer, inject} from "mobx-react";

import "./styles.scss";
import "assets/styles/main.scss";

const App = inject("mainStore", "authStore", "routingStore")(observer(class App extends Component {

    constructor(props){
	super(props);
	this.loggerOut = this.loggerOut.bind(this);
    }

    loggerOut(){
	this.props.authStore.logout();
    }

    render() {
	console.log("App is rendered");
	
	console.log("isLoggedIn : "+this.props.authStore.isLoggedIn);
	// console.log("secret : "+this.props.authStore.sessionSecret);

	// console.log(useCookies.get("login"));
	
	return (

	   <div className="app">
	      <Route exact path="/" render={() => (
		    this.props.authStore.isLoggedIn || this.props.authStore.sessionSecret == localStorage.secret ?
		      <Dashboard /> : <Redirect to="/account" />
	      )} />
		<Route exact path="/account" render={() => (
		    this.props.authStore.isLoggedIn || this.props.authStore.sessionSecret == localStorage.secret  ?
			<Redirect to="/"/> : <Login/>
		)} />
		<Route path="/overview" render={() => (
		   this.props.authStore.isLoggedIn || this.props.authStore.sessionSecret === localStorage.secret  ?
			<Dashboard/> : <Redirect to="/"/>
		)} />
		<Route path="/synthesis" render={() => (
		    this.props.authStore.isLoggedIn || this.props.authStore.sessionSecret == localStorage.secret  ?
			<Synthesis/> : <Redirect to="/"/>
		)} />
		<Route path="/admin" render={() => (
		    this.props.authStore.isLoggedIn || this.props.authStore.sessionSecret == localStorage.secret  ?
			<Admin/> : <Redirect to="/"/>
		)} />
		</div>
	    

	);
    }
}));



export default App;
