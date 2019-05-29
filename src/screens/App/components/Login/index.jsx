import React, { Component } from 'react';

import {observer, inject} from "mobx-react";

import retrieveFormData from "utils/retrieveFormData";


import "./styles.scss";
import "assets/styles/main.scss";

const Login = inject("mainStore", "authStore", "routingStore")(observer(class Login extends Component {
    constructor(props){
	super(props);
	this.handleSubmit = this.handleSubmit.bind(this);

	this.state = {
	    hasErrors: false,
	    errorOnUsername: false,
	    errorOnPassword: false
	};
    }

    handleSubmit(event){
	event.preventDefault();

	const usernameField = document.getElementById("login--username");
	const passwordField = document.getElementById("login--password");
	const cookieCheckbox = document.getElementById("cookieCheck");

	usernameField.value == "" ? this.state.errorOnUsername = true : this.state.errorOnUsername = false;
	passwordField.value == "" ? this.state.errorOnPassword = true : this.state.errorOnPassword = false;
	const cookieChechboxValue = cookieCheckbox.checked;
	this.state.hasErrors = true;
	
	
	if (!this.state.errorOnUsername && !this.state.errorOnPassword){
	    this.state.hasErrors = false;
	    
	    let fd = retrieveFormData(event.target);
	    this.props.authStore.logToApp(fd.username, fd.password, cookieChechboxValue);
	}
	
	this.setState({
	    hasErrors: this.state.hasErrors,
	    errorOnUsername: this.state.errorOnUsername,
	    errorOnPassword: this.state.errorOnPassword
	});
    }

    render() {
	const usernameAttr = this.state.errorOnTime ? "is-invalid" : null;
	const passwordAttr = this.state.errorOnTask ? "is-invalid" : null;
	
	const { location, push, goBack } = this.props.routingStore;
	
	// console.log("Login is rendered");
	return (
	    <div className="container">
	      
	      <div className="row">
		<div className="col-md-4 offset-md-4">
		  <h3>This is a time tracker</h3>
		  <p>Please login</p>
		</div>
	      </div>

	      <form onSubmit={this.handleSubmit}>
		<div className="row">
		  <div className="col-md-4 offset-md-4">
		    {this.props.authStore.hasErrors ? <div className="alert alert-danger" role="alert">
			  Check your credentials...
		    </div> : null }
		  </div>
		</div>
		<div className="row">
		  <div className="col-md-4 offset-md-4">
		    <label htmlFor="login--username">Username</label>
		    <input className="form-control w-100"
			   name="username"
			   id="login--username"
			   type="text"
			   placeholder="Enter your username"
			   aria-label="Input"/>
		  </div>
		</div>
		<div className="row">
		  <div className="col-md-4 offset-md-4">
		    <label htmlFor="login--password">Password</label>
		    <input className="form-control w-100 "
			   name="password"
			   id="login--password"
			   type="password"
			   aria-label="Input"/>
		  </div>
		</div>
		<div className="row">
		  <div className="col-md-4 offset-md-4">
		    <button
		      className="btn btn-primary">Sign in</button>
		  </div>
		</div>
		<div className="row">
		  <div className="col-md-4 offset-md-4">
		    <div className="form-check">
		      <input className="form-check-input" type="checkbox" value="" id="cookieCheck"/>
		      <label className="form-check-label" htmlFor="cookieCheck">
			Remember me
		      </label>
		    </div>
		  </div>
		</div>
		<div className="row">
		  <div className="col-md-4 offset-md-4">
		    <a onClick={() => push('/lost-password')}>Forgot your password</a>
		  </div>
		</div>
	      </form>
	    </div>
	);
    }
}));

export default Login;
