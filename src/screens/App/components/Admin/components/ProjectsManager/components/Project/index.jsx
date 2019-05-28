import React, { Component } from 'react';
import {readableDate} from "utils/readableDate";
import { getClientName, getProjectName, getUserName, getProjectsNumberForClient } from "utils/defsConverter";
import retrieveFormData from "utils/retrieveFormData";
import ClientsSelector from "sharedComponents/ClientsSelector";

import {toJS} from "mobx";
import {inject, observer} from "mobx-react";

// import ProjectsSelector from "sharedComponents/ProjectsSelector";

import "./styles.scss";

const Project = inject("mainStore", "authStore")(observer(class Project extends Component {
    constructor(props){
	super(props);


	// const clid = toJS(this.props.mainStore.projectsDefinitions.find(item => item._id == this.props.mainStore.activeProject)).client;
	
	this.state = {
	    // projectName: getProjectName(this.props.mainStore.projectsDefinitions, this.props.mainStore.activeProject),
	    // clientId: this.props.mainStore.activeProjectDetails.client,
	    // clientName: getProjectName(this.props.mainStore.clientsDefinitions, this.props.mainStore.activeProjectDetails.client),
	    isEdited: false,
	    activeClient: this.props.clientid,
	    hasTracks: null
	    // activeProject: this.props.mainStore.activeProject
	};
	
	// binds
	// this.deleteItem = this.deleteItem.bind(this);
	this.editItem = this.editItem.bind(this);
	this.cancelEdit = this.cancelEdit.bind(this);
	this.setActiveClient = this.setActiveClient.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.deleteProject = this.deleteProject.bind(this);
	// this.getTracksNumber = this.getTracksNumber.bind(this);
    }

    componentDidUpdate(){
	if(this.state.isEdited){
	    this.populateFields();
	}
    }

    
    // deleteItem(e){
    // 	this.props.mainStore.deleteProject(this.props.projectid);
    // }
    
    editItem(e){
	// this.populatedFields();
	this.setState({isEdited: true});
    }
    cancelEdit(e){
	this.setState({isEdited: false});
    }

    deleteProject(){
	// console.log("delete project");
	this.props.mainStore.deleteProject(this.props.projectid);
    }

    populateFields(){
	// console.log("populate fields");
	let inputName = document.getElementById("project-input--project-"+this.props.projectid);
	let inputClient = document.getElementById("project-input--client");
	let inputDescription = document.getElementById("project-input--description-"+this.props.projectid);
	let inputBuget = document.getElementById("project-input--budget-"+this.props.projectid);
	
	inputName.value = getProjectName(this.props.mainStore.projectsDefinitions, this.props.projectid);
	inputClient.value = this.state.activeClient;
	inputDescription.value = this.props.description;
	inputBuget.value = this.props.budget;
    }
    
    handleSubmit(e){
	// console.log("submit");
	e.preventDefault();
	let fd = retrieveFormData(e.target, this.props.authStore.userId);

	// console.log(fd);
	
	// on lance la requête
	this.props.mainStore.updateProject(this.props.projectid, fd);

	// const cli = toJS(this.props.mainStore.projectsDefinitions.find(item => item._id == this.state.activeProject)).client;
	
	this.setState({
	    isEdited: false
	});	
    }

    setActiveClient(c){
	
	this.setState({activeClient: c});

	// console.log(c);
	// console.log(getClientName(this.props.mainStore.clientsDefinitions, c));
    }
    // getTracksNumber(){
    // 	const trk = this.props.mainStore.loadTrackedTime(this.props.projectid);
    // 	// console.log(toJS(this.props.mainStore.activeTrackedTime));
    // 	// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> "+trk.data.message.length);
    // 	// this.setState({projectTracks: t})
    // 	// console.log(this.props.mainStore.activeTrackedTime);
    // 	// if(this.props.mainStore.activeTrackedTime)
    // }
    
    render() {

	// console.log("/////////// "+this.props.mainStore.activeTrackedTime);
	// console.log(this.state.projectTracks);
	
	if(this.state.isEdited){
	    return (
		<div className="project edited">
		  <ClientsSelector onChange={this.setActiveClient} activeClient={this.props.clientid}/>
		  <form onSubmit={this.handleSubmit}>
		    <input className="form-control"
			   name="name"
			   id={"project-input--project-"+this.props.projectid}
			   type="text"
			   aria-label="Input"/>
		    <input className="form-control"
			   name="description"
			   id={"project-input--description-"+this.props.projectid}
			   type="text"
			   aria-label="Input"/>
		    <input className="form-control"
			   name="budget"
			   id={"project-input--budget-"+this.props.projectid}
			   type="text"
			   aria-label="Input"/>
		    <input className="form-control"
			   id="project-input--client"
			   name="client"
			   type="hidden"
			   value=""
			   aria-label="Input" />
		    <button
		      className="btn btn-primary btn-sm">Update</button>
		    <button
		      className="btn btn-light btn-sm" onClick={this.cancelEdit}>Cancel</button>
		  </form>
		  {this.props.hasTracks ?
		      <p>Attention, ce projet a des temps renseignés</p>
		      : null }
		      <button className="btn btn-alert btn-sm" onClick={this.deleteProject}>Delete</button>
		</div>
	    );
	} else {
	    return (
		<div className="project">
		  {getProjectName(this.props.mainStore.projectsDefinitions, this.props.projectid)} - 
		  {getClientName(this.props.mainStore.clientsDefinitions, this.props.clientid)} - 
		  {this.props.description} - 
		  {this.props.budget} - 
		  <a className="track-edit d-flex align-items-center" href="#" data-toggle="tooltip" data-placement="top" title="Edit" onClick={this.editItem} ><i className="ico ico-medium">pen</i></a>
		  
		</div>
	    );

	}
    }
}));

export default Project;
