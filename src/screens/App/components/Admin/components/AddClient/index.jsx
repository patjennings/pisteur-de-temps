import React, { Component } from 'react';
// import axios from "axios";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import retrieveFormData from "utils/retrieveFormData";

import {toJS} from "mobx";
import {inject, observer} from "mobx-react";


import "./styles.scss";

const AddClient = inject("mainStore")(observer(class AddClient extends Component {
    constructor(props){
	super(props);

	this.state = {
	    hasErrors: false,
	    errorOnName: false
	};

	this.handleSubmit = this.handleSubmit.bind(this);
	this.cancelEdit = this.cancelEdit.bind(this);
    }
    handleSubmit(e){
	e.preventDefault();
	// console.log(e.target);
	
	const nameField = document.getElementById("client-input--name");

	nameField.value == "" ? this.state.errorOnName = true : this.state.errorOnName = false;
	this.state.hasErrors = true;
	
	if (!this.state.errorOnName){
	    this.state.hasErrors = false;
	    let fd = retrieveFormData(e.target);

	    // on lance la requête
	    this.props.mainStore.postNewClient(fd);
	    this.props.onChange();

	}
	
	this.setState({
	    errorOnName: this.state.errorOnName,
	    hasErrors: this.state.hasErrors
	});
    }
    cancelEdit(){
	//
    }
    render() {
	const nameAttr = this.state.errorOnName ? "is-invalid" : null;
	
	return (
	    <div className="client--input">
	      {this.state.hasErrors ? <div className="alert alert-danger" role="alert">
		    You need {this.state.errorOnName? "a name" : null } in order to complete
	      </div> : null }
	      <form onSubmit={this.handleSubmit}>
		<div className="row">
		  <div className="col-9">
		  <input className={"form-control "+nameAttr}
			 id="client-input--name"
			 name="name"
			 type="text"
			 placeholder={this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].components.add_client.name_placeholder}
			 aria-label="Input" />
		  </div>
		  <div className="col-3">
		    <button
		      className="btn btn-primary">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].components.add_client.create_client}</button>
		    <button
		      className="btn btn-light" onClick={this.props.onChange}>{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].global.cancel}</button>
		  </div>
		</div>
		</form>
	    </div>
	);
    }
}));

export default AddClient;
