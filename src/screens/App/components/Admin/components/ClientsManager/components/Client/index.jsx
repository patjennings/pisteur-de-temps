import React, { Component } from 'react';
import {readableDate} from "utils/readableDate";
import { getClientName, getProjectName, getUserName, getProjectsNumberForClient } from "utils/defsConverter";
import retrieveFormData from "utils/retrieveFormData";

import {toJS} from "mobx";
import {inject, observer} from "mobx-react";

// import ProjectsSelector from "sharedComponents/ProjectsSelector";

import "./styles.scss";

const Client = inject("mainStore", "authStore")(observer(class Client extends Component {
    constructor(props){
	super(props);

	// const clid = toJS(this.props.mainStore.projectsDefinitions.find(item => item._id == this.props.mainStore.activeProject)).client;
	
	this.state = {
	    // projectName: getProjectName(this.props.mainStore.projectsDefinitions, this.props.mainStore.activeProject),
	    // clientId: this.props.mainStore.activeProjectDetails.client,
	    // clientName: getClientName(this.props.mainStore.clientsDefinitions, this.props.mainStore.activeProjectDetails.client),
	    isEdited: false,
	    // activeProject: this.props.mainStore.activeProject
	};
	
	// binds
	this.deleteItem = this.deleteItem.bind(this);
	this.editItem = this.editItem.bind(this);
	this.cancelEdit = this.cancelEdit.bind(this);
	// this.setActiveProject = this.setActiveProject.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(){
	if(this.state.isEdited){
	    this.populateFields();
	}
    }

    
    deleteItem(e){
	
	this.props.mainStore.deleteClient(this.props.clientid);
    }
    
    editItem(e){
	this.setState({isEdited: true});
    }
    cancelEdit(e){
	this.setState({isEdited: false});
    }

    populateFields(){
	// console.log("populate fields");
	let inputName = document.getElementById("name-input--client-"+this.props.clientid);
	// let inputComment = document.getElementById("track-input--comment-"+this.props.taskid);
	// let inputTask = document.getElementById("track-input--task-"+this.props.taskid);
	
	inputName.value = getClientName(this.props.mainStore.clientsDefinitions, this.props.clientid);
	// inputComment.value = this.props.comment;
	// inputTask.value = this.props.task;
    }
    
    handleSubmit(e){
	console.log("submit");
	e.preventDefault();
	let fd = retrieveFormData(e.target, this.props.authStore.userId);

	console.log(fd);
	
	// on lance la requête
	this.props.mainStore.updateClient(this.props.clientid, fd);

	// const cli = toJS(this.props.mainStore.projectsDefinitions.find(item => item._id == this.state.activeProject)).client;
	
	this.setState({
	    isEdited: false
	});	
    }

    setActiveProject(p){
	// this.setState({activeProject: p});	
    }
    
    render() {
	const projectsNumber = getProjectsNumberForClient(this.props.mainStore.projectsDefinitions, this.props.clientid);
	
	if(this.state.isEdited){
	    return (
		<li className="client edited">	  
		  <form onSubmit={this.handleSubmit}>
		    <div className="row">
		      <div className="col-9">
		      <input className="form-control"
			     name="name"
			     id={"name-input--client-"+this.props.clientid}
			     type="text"
			     aria-label="Input"/>
		      </div>
		      <div className="col-3">
			<button
			  className="btn btn-primary btn-sm">Update</button>&nbsp;
			<button
			  className="btn btn-light btn-sm" onClick={this.cancelEdit}>Cancel</button>

		      </div>
		    </div>
		  </form>
		</li>
	    );
	} else {
	    return (
		<li className="client">
		  <div className="row">
		    <div className="col-9">
		      {getClientName(this.props.mainStore.clientsDefinitions, this.props.clientid)}&nbsp;&nbsp;
		      {projectsNumber < 1 ? <span className="badge badge-light">No active project</span> : <span className="badge badge-warning">{projectsNumber} active projects</span>}
		    </div>
		    <div className="col-3">
		      <button type="button" className="btn btn-light btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onClick={this.editItem} >Edit</button>
		      {projectsNumber < 1 ? <button type="button" className="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onClick={this.deleteItem} >Delete</button> : <button type="button" className="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onClick={this.deleteItem} disabled>Delete</button>}
		      
		    </div>
		  </div>
		</li>



	
	    );

	}
    }
}));

export default Client;
