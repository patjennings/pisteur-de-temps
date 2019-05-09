import React, { Component } from 'react';

import {observer, inject} from "mobx-react";

import retrieveFormData from "utils/retrieveFormData";
import parseQuery from "utils/parseQuery";

import "./styles.scss";
import "assets/styles/main.scss";

const LostPassword = inject("mainStore", "authStore", "routingStore")(observer(class LostPassword extends Component {
    constructor(props){
	super(props);
	this.handleSubmit = this.handleSubmit.bind(this);

	this.state = {
	    errorOnEmail: false,
	    emailSent: false
	};
    }

    handleSubmit(event){
	event.preventDefault();
	
	const { location, push, goBack } = this.props.routingStore;
	const emailField = document.getElementById("login--email");

	emailField.value == "" ? this.state.errorOnEmail = true : this.state.errorOnEmail = false;

	if (!this.state.errorOnEmail){
	    let fd = retrieveFormData(event.target);
	    this.props.authStore.sendRetrieveMail(fd.email);
	    this.state.emailSent = true;

	    setTimeout(() => { push("/"); }, 3000);
	}
	
	this.setState({
	    emailSent: this.state.emailSent,
	    errorOnEmail: this.state.errorOnEmail
	});
    }

    render() {
	return (
	    <div>
	      {this.state.errorOnEmail ? <div className="alert alert-danger" role="alert">
		    Please enter a valid email
	      </div> : null}
	      {this.props.authStore.hasRetrievalError ? <div className="alert alert-danger" role="alert">
		    {this.props.authStore.retrievalErrorMessage}
	      </div> : null}
	{!this.props.authStore.hasRetrievalError && this.state.emailSent ? <div className="alert alert-success" role="alert">
		    Check your email
	      </div> : null}
	
	      <form onSubmit={this.handleSubmit}>
		<div className="row">
		  <div className="col">
		    <label htmlFor="login--email">Enter your account email</label>
		    <input className="form-control w-100"
			   name="email"
			   id="login--email"
			   type="text"
			   placeholder="Your email"
			   aria-label="Input"/>
		    <button
		      className="btn btn-primary">Submit new password</button>
		  </div>
		</div>
	      </form>
	    </div>
	);
    }
}));

export default LostPassword;
