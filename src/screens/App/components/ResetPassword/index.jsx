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
		    {this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].reset_password.enter_password}
	      </div> : null}

	{!this.state.errorOnPassword && this.state.passwordRenewed ? <div className="alert alert-success" role="alert">
		    {this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].reset_password.message_success}
	      </div> : null}
	      <form onSubmit={this.handleSubmit}>
		<div className="row">
		  <div className="col">
		    <label htmlFor="login--password">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].reset_password.enter_new_password}</label>
		    <input className="form-control w-100"
			   name="password"
			   id="login--password"
			   type="password"
			   placeholder={this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].reset_password.new_password}
			   aria-label="Input"/>
		    <button
		      className="btn btn-primary">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].reset_password.submit}</button>
		  </div>
		</div>
	      </form>
	    </div>
	);
    }
}));

export default ResetPassword;
