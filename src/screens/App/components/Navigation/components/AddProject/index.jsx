import React, { Component } from 'react';
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import retrieveFormData from "utils/retrieveFormData";

import {toJS} from "mobx";
import {inject, observer} from "mobx-react";


import "./styles.scss";

const AddProject = inject("mainStore")(observer(class AddProject extends Component {
    constructor(props){
	super(props);

	this.state = {
	    errorOnName: false,
	    errorOnBudget: false
	}

	this.handleSubmit = this.handleSubmit.bind(this);
	this.cancelEdit = this.cancelEdit.bind(this);
    }
    handleSubmit(e){
	e.preventDefault();

	const nameField = document.getElementById("project-input--name");
	const budgetField = document.getElementById("project-input--budget");

	nameField.value == "" ? this.state.errorOnName = true : this.state.errorOnName = false;
	budgetField.value == "" ? this.state.errorOnBudget = true : this.state.errorOnBudget = false;
	
	if (!this.state.errorOnName && !this.state.errorOnBudget){
	    let fd = retrieveFormData(e.target);
	    
	    // on lance la requête
	    this.props.mainStore.postNewProject(fd);
	    this.props.onChange();
	}
	
	this.setState({
	    errorOnName: this.state.errorOnName,
	    errorOnBudget: this.state.errorOnBudget,
	});

    }
    cancelEdit(){
	//
    }
    render() {
	const nameAttr = this.state.errorOnName ? "is-invalid" : null;
	const budgetAttr = this.state.errorOnBudget ? "is-invalid" : null;
	
	return (
	    <div className="client--input">
	      <div className="row">
		<form onSubmit={this.handleSubmit}>
		  <label htmlFor="project-input--name">Project name</label>
		  
		  <input className={"form-control "+nameAttr}
			 id="project-input--name"
			 name="name"
			 type="text"
			 placeholder="Project name"
			 aria-label="Input" />
		  {this.state.errorOnName ? <div className="invalid-feedback">Please choose a name.</div> : null }
		  
		  <label htmlFor="project-input--description">Description</label>
		  <textarea className="form-control"
			    id="project-input--description"
			    name="description"
			    type="text"
			    placeholder="Enter a description"
			    aria-label="Input" />
		  <label htmlFor="project-input--budget">Budget</label>
		  <input className={"form-control "+budgetAttr}
			 id="project-input--budget"
			 name="budget"
			 type="text"
			 placeholder="Give it a budget"
			 aria-label="Input"
			 data-parse="number"/>
		  {this.state.errorOnBudget ? <div className="invalid-feedback">Please choose a budget.</div> : null }
		  <input className="form-control"
			 name="client"
			 type="hidden"
			 value={this.props.clientId}
			 aria-label="Input" />
		  <button
		    className="btn btn-primary">Update</button>
		  <button
		    className="btn btn-light" onClick={this.props.onChange}>Cancel</button>
		</form>
	      </div>
	    </div>
	);
    }
}));

export default AddProject;
