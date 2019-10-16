import React, { Component } from 'react';
// import axios from "axios";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import retrieveFormData from "utils/retrieveFormData";

import {toJS} from "mobx";
import {inject, observer} from "mobx-react";

const AddClient = inject("mainStore")(observer(class AddClient extends Component {
    constructor(props){
	super(props);

	this.state = {
	    errorOnName: false,
	};

	this.handleSubmit = this.handleSubmit.bind(this);
	this.cancelEdit = this.cancelEdit.bind(this);
    }
    handleSubmit(e){
	e.preventDefault();
	// console.log(e.target);
	
	const nameField = document.getElementById("client-input--name");

	nameField.value == "" ? this.state.errorOnName = true : this.state.errorOnName = false;
	
	if (!this.state.errorOnName){
	    let fd = retrieveFormData(e.target);

	    // on lance la requête
	    this.props.mainStore.postNewClient(fd);
	    this.props.onChange();

	}
	
	this.setState({
	    errorOnName: this.state.errorOnName,
	});
    }
    cancelEdit(){
	//
    }
    render() {
	const nameAttr = this.state.errorOnName ? "is-invalid" : null;
	
	return (
	    <div className="client--input">
	      <div className="">
		<form onSubmit={this.handleSubmit}>
		  <label htmlFor="client-input--name">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].components.add_client.name_label}</label>
		  <input className={"form-control "+nameAttr}
			 id="client-input--name"
			 name="name"
			 type="text"
			 placeholder={this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].components.add_client.name_placeholder}
			 aria-label="Input" />
		  {this.state.errorOnName ? <div className="invalid-feedback">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].components.add_client.error_name}</div> : null }
		  <button
		    className="btn btn-primary">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].components.add_client.create_client}</button>
		  <button
		    className="btn btn-light" onClick={this.props.onChange}>{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].global.cancel}</button>
		</form>
	      </div>
	    </div>
	);
    }
}));

export default AddClient;
