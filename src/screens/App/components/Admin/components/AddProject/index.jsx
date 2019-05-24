import React, { Component } from 'react';
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';
import ClientsSelector from "sharedComponents/ClientsSelector";
import retrieveFormData from "utils/retrieveFormData";

import {toJS} from "mobx";
import {inject, observer} from "mobx-react";

import "./styles.scss";

const AddProject = inject("mainStore")(observer(class AddProject extends Component {
    constructor(props){
	super(props);

	this.state = {
	    errorOnName: false,
	    errorOnBudget: false,
	    errorOnClient: false,
	    activeClient: ""
	};

	this.handleSubmit = this.handleSubmit.bind(this);
	this.setActiveClient = this.setActiveClient.bind(this);
	this.cancelEdit = this.cancelEdit.bind(this);
    }
    handleSubmit(e){
	e.preventDefault();

	const nameField = document.getElementById("project-input--name");
	const budgetField = document.getElementById("project-input--budget");
	const clientField = document.getElementById("project-input--client");

	nameField.value   == "" ? this.state.errorOnName = true : this.state.errorOnName = false;
	budgetField.value == "" ? this.state.errorOnBudget = true : this.state.errorOnBudget = false;
	clientField.value == "" ? this.state.errorOnClient = true : this.state.errorOnClient = false;
	
	if (!this.state.errorOnName && !this.state.errorOnBudget && !this.state.errorOnClient){
	    let fd = retrieveFormData(e.target);

	    console.log(fd);
	    
	    // on lance la requête
	    this.props.mainStore.postNewProject(fd);
	    this.props.onChange();
	}
	
	this.setState({
	    errorOnName: this.state.errorOnName,
	    errorOnBudget: this.state.errorOnBudget,
	});

    }
    setActiveClient(c){
	this.setState({activeClient: c});
	console.log(c);
	console.log(getClientName(this.props.mainStore.clientsDefinitions, c));
    }
    cancelEdit(){
	//
    }
    render() {
	const nameAttr = this.state.errorOnName ? "is-invalid" : null;
	const budgetAttr = this.state.errorOnBudget ? "is-invalid" : null;

	// console.log(this.state.activeClient);

	// console.log(this.state);
	
	return (
	    <div className="client--input">
	      <div className="row">
		<form onSubmit={this.handleSubmit}>
		  <ClientsSelector onChange={this.setActiveClient}/>
		  {this.state.errorOnClient ? <div className="invalid-feedback">Please choose a client.</div> : null }
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
			 id="project-input--client"
			 name="client"
			 type="hidden"
			 value={this.state.activeClient}
			 aria-label="Input" />
		  <button
		    className="btn btn-primary">Create project</button>
		  <button
		    className="btn btn-light" onClick={this.props.onChange}>Cancel</button>
		</form>
	      </div>
	    </div>
	);
    }
}));

export default AddProject;
