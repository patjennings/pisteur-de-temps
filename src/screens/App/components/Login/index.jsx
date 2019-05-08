import React, { Component } from 'react';

import {observer, inject} from "mobx-react";

import retrieveFormData from "utils/retrieveFormData";


import "./styles.scss";
import "assets/styles/main.scss";

const Login = inject("mainStore", "authStore")(observer(class Login extends Component {
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

	usernameField.value == "" ? this.state.errorOnUsername = true : this.state.errorOnUsername = false;
	passwordField.value == "" ? this.state.errorOnPassword = true : this.state.errorOnPassword = false;
	this.state.hasErrors = true;
	
	
	if (!this.state.errorOnUsername && !this.state.errorOnPassword){
	    this.state.hasErrors = false;
	    
	    let fd = retrieveFormData(event.target);
	    this.props.authStore.logToApp(fd.username, fd.password);
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
	
	// console.log("Login is rendered");
	return (
	    <div className="login logged-out">
	      {this.props.authStore.hasErrors ? <div className="alert alert-danger" role="alert">
		    Check your credentials...
	      </div> : null }
	      
	      <form onSubmit={this.handleSubmit}>
		<div className="row">
		  <div className="col">
		    <label htmlFor="login--username">Username</label>
		    <input className="form-control w-100"
			   name="username"
			   id="login--username"
			   type="text"
			   placeholder="Enter your username"
			   aria-label="Input"/>
		    <label htmlFor="login--password">Password</label>
		    <input className="form-control w-100 "
			   name="password"
			   id="login--password"
			   type="password"
			   aria-label="Input"/>
		    <button
		      className="btn btn-primary">Sign in</button>
		    <div className="form-check">
		      <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
			<label className="form-check-label" htmlFor="defaultCheck1">
			  Remember me
			</label>
		    </div>
		    <a href="#">Forgot your password</a>
		    <a href="#">Create an account</a>
		  </div>
		</div>
	      </form>
	      
	    </div>
	);
    }
}));

export default Login;
