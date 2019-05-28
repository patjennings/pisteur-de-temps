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
		<div className="client edited">	  
		  <form onSubmit={this.handleSubmit}>
		    <input className="form-control"
			   name="name"
			   id={"name-input--client-"+this.props.clientid}
			   type="text"
			   aria-label="Input"/>
		    <button
		      className="btn btn-primary btn-sm">Update</button>
		    <button
		      className="btn btn-light btn-sm" onClick={this.cancelEdit}>Cancel</button>
		  </form>
		</div>
	    );
	} else {
	    return (
		<div className="client">
		  {getClientName(this.props.mainStore.clientsDefinitions, this.props.clientid)} - {projectsNumber} projects
		  <a className="track-edit d-flex align-items-center" href="#" data-toggle="tooltip" data-placement="top" title="Edit" onClick={this.editItem} ><i className="ico ico-medium">pen</i></a>
		  {projectsNumber < 1 ?
					<a className="track-delete d-flex align-items-center" href="#" data-toggle="tooltip" data-placement="top" title="Delete" onClick={this.deleteItem}><i className="ico ico-medium ico-trash">trash</i></a> :
					<a className="track-delete d-flex align-items-center muted" data-toggle="tooltip" data-placement="top" title="Delete"><i className="ico ico-medium ico-trash">trash</i></a>}
		  
		</div>
	    );

	}
    }
}));

export default Client;
