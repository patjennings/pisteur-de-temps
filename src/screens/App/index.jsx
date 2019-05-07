import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import Definitions from 'utils/definitions';

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
    }

    render() {
	console.log("App is rendered");
	console.log("isLoggedIn : "+this.props.authStore.isLoggedIn);
	
	return (
	    
	      <div className="app">
		<Route exact path="/" render={() => (
		      !this.props.authStore.isLoggedIn ?
			<Login/>
			    :
			    <Redirect to="/overview"/>
		)} />
		<Route path="/overview" render={() => (
		      !this.props.authStore.isLoggedIn ?
			<Redirect to="/"/>
			    :
			    <Dashboard/>
		)} />
		<Route path="/synthesis" render={() => (
		    !this.props.authStore.isLoggedIn ?
			<Redirect to="/"/>
			:
			<Synthesis/>
		)} />
		<Route path="/admin" render={() => (
		    !this.props.authStore.isLoggedIn ?
			<Redirect to="/"/>
			:
			<Admin/>
		)} />
		</div>

	);
    }
}));

export default App;
