import React, { Component } from 'react';

import {observer, inject} from "mobx-react";

import retrieveFormData from "utils/retrieveFormData";

import "assets/styles/main.scss";
import "./styles.scss";

const logo = require('assets/images/logo.svg');

console.log(process.env.NODE_ENV);

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
	    
	    let fd = retrieveFormData(event.target, null, null);
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
	
	return (
	    <div className="login">
	      <div className="container">
		
		<div className="row">
		  <div className="col-md-12 d-flex justify-content-center">
		    <img src={logo} height="64"/>
		  </div>
		</div>
		<div className="row">
		  <div className="col-md-12 d-flex justify-content-center">
		    <p>{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].login.please_login}</p>
		  </div>

		</div>
		<form onSubmit={this.handleSubmit}>
		  <div className="row">
		    <div className="col-md-12 ">
		      {this.props.authStore.hasErrors ? <div className="alert alert-danger" role="alert">
			    {this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].login.check_credentials}
		      </div> : null }
		    </div>
		  </div>
		  <div className="row">
		    <div className="col-md-12 ">
		      <label htmlFor="login--username">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].login.username}</label>
		      <input className="form-control w-100"
			     name="username"
			     id="login--username"
			     type="text"
			     placeholder={this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].login.username_placeholder}
			     aria-label="Input"/>
		    </div>
		  </div>
		  <div className="row">
		    <div className="col-md-12 ">
		      <label htmlFor="login--password">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].login.password}</label>
		      <input className="form-control w-100 "
			     name="password"
			     id="login--password"
			     type="password"
			     aria-label="Input"/>
		    </div>
		  </div>
		  <div className="row connection">
		    <div className="col-md-12">
		      <button
			className="btn btn-primary">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].login.sign_in}</button>
		    </div>
		  </div>
		  <div className="row">
		    <div className="col-md-12">
		      <div className="form-check">
			<input className="form-check-input" type="checkbox" value="" id="cookieCheck"/>
			<label className="form-check-label" htmlFor="cookieCheck">
			  {this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].login.remember_me}
			</label>
		      </div>
		    </div>
		  </div>
		  <div className="row">
		    <div className="col-md-12">
		      <a onClick={() => push('/lost-password')}>{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].login.forgot_password}</a>
		    </div>
		  </div>
		</form>
	      </div>
	    </div>
	);
    }
}));

export default Login;
