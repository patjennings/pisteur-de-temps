import React, { Component } from 'react';

import {observer, inject} from "mobx-react";

import retrieveFormData from "utils/retrieveFormData";
import parseQuery from "utils/parseQuery";

import "./styles.scss";
import "assets/styles/main.scss";

const ResetPassword = inject("mainStore", "authStore", "routingStore")(observer(class ResetPassword extends Component {
    constructor(props){
	super(props);
	this.handleSubmit = this.handleSubmit.bind(this);

	this.state = {
	    errorOnPassword: false,
	    passwordRenewed: false
	};
    }

    componentWillMount(){
	const params = parseQuery(this.props.location.search);
	this.props.authStore.setRetrieveKey(params.key);
    }

    handleSubmit(event){
	event.preventDefault();

	const { location, push, goBack } = this.props.routingStore;
	const newPasswordField = document.getElementById("login--password");

	newPasswordField.value == "" ? this.state.errorOnPassword = true : this.state.errorOnPassword = false;

	if (!this.state.errorOnPassword){
	    let fd = retrieveFormData(event.target);
	    this.props.authStore.setNewPassword(fd.password);
	    
	    this.state.passwordRenewed = true;
	    this.state.errorOnPassword = false;

	    setTimeout(() => { push("/"); }, 3000);
	}
	
	this.setState({
	    passwordRenewed: this.state.passwordRenewed,
	    errorOnPassword: this.state.errorOnPassword
	});
    }

    render() {
	
	
	return (
	    <div>
	    {this.state.errorOnPassword ? <div className="alert alert-danger" role="alert">
		    Please enter a password…
	      </div> : null}

	{!this.state.errorOnPassword && this.state.passwordRenewed ? <div className="alert alert-success" role="alert">
		    New password is now active. Go on homepage, ands try it out !
	      </div> : null}
	      <form onSubmit={this.handleSubmit}>
		<div className="row">
		  <div className="col">
		    <label htmlFor="login--password">Enter your new password</label>
		    <input className="form-control w-100"
			   name="password"
			   id="login--password"
			   type="password"
			   placeholder="New password"
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

export default ResetPassword;
