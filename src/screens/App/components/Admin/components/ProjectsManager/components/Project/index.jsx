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
	this.deleteTask = this.deleteTask.bind(this);
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
    deleteTask(e){
	const elem = e.currentTarget;
	const task = elem.previousSibling.innerHTML;
	this.props.mainStore.deleteTaskInProject(this.props.projectid, task);
    }

    populateFields(){
	// console.log("populate fields");
	let inputName = document.getElementById("project-input--name-"+this.props.projectid);
	let inputClient = document.getElementById("project-input--client");
	let inputDescription = document.getElementById("project-input--description-"+this.props.projectid);
	let inputBuget = document.getElementById("project-input--budget-"+this.props.projectid);
	
	inputName.value = getProjectName(this.props.mainStore.projectsDefinitions, this.props.projectid);
	inputClient.value = this.state.activeClient;
	inputDescription.value = this.props.description;
	inputBuget.value = this.props.budget;
    }
    
    handleSubmit(e){
	console.log("submit");
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
	// console.log(this.props.projectid);
	
	if(this.state.isEdited){
	    return (
		<li className="project edited">
	          <form onSubmit={this.handleSubmit} className="w100">
		      <div className="row">  
  			<div className="col-2">
  			  <ClientsSelector onChange={this.setActiveClient} activeClient={this.props.clientid}/>
  			  <input className="form-control"
  				 id="project-input--client"
  				 name="client"
  				 type="hidden"
  				 value=""
  				 aria-label="Input" />
  			</div>
  			<div className="col-4">
  			  <input className="form-control"
  				 name="name"
  				 id={"project-input--name-"+this.props.projectid}
  				 type="text"
  				 aria-label="Input"/><br/>
  			  <textarea className="form-control"
  				    name="description"
  				    id={"project-input--description-"+this.props.projectid}
  				    type="text"
  				    aria-label="Input"/>
  			</div>
  			<div className="col-2">
  			  <input className="form-control"
  				 name="budget"
  				 id={"project-input--budget-"+this.props.projectid}
  				 type="text"
  				 aria-label="Input"/>
  			</div>
			<div className="col-3">
			  {this.props.tasks.map(
			      t => <div className="btn-group" role="group" aria-label="Basic example">
				  <button type="button" className="btn btn-info btn-sm">{t}</button>
		                      <button type="button" className="btn btn-info btn-sm" onClick={this.deleteTask}>x</button>
		                  </div>
			  )}

		    
		        </div>
			<div className="col-1">
  			</div>
			
  		      </div>
		  
		  <div className="row">
		    <div className="offset-8 col-4">
		      <button
			className="btn btn-primary">Update</button>&nbsp;&nbsp;
		    <button
		      className="btn btn-light" onClick={this.cancelEdit}>Cancel</button>
		    </div>
		  </div>
		  </form>
		  <div className="row">
		    
		    <div className="col-2">


		      <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Delete project
		    </button>
		    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
		      <div className="dropdown-divider"></div>
		      <a className="dropdown-item" onClick={this.deleteProject}>Sure ?</a>
		    </div>
	
		    </div>
		    <div className="col-10">
		      {this.props.hasTracks && <div className="alert alert-danger" role="alert">Be careful, because all time tracked on this will be deleted. <strong>And this can't be undone.</strong></div> }
		    </div>
		  </div>
		  
		</li>
	    );
	} else {
	    return (
		<li className="project">
		  <div className="row">
		    <div className="col-2">
		      {getClientName(this.props.mainStore.clientsDefinitions, this.props.clientid)}
		    </div>
		    <div className="col-4">
		      {getProjectName(this.props.mainStore.projectsDefinitions, this.props.projectid)}<br/>
		      <span className="text-muted">{this.props.description}</span>
		    </div>
		    <div className="col-2">
		      {this.props.budget}
		    </div>
		    <div className="col-3">
		      {this.props.tasks.map(t => <button type="button" className="btn btn-light btn-sm">{t}</button> )}
		    </div>
		    <div className="col-1">
		      <button type="button" className="btn btn-light btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onClick={this.editItem} >Edit</button>
		    </div>
		  </div>
		</li>
	    );

	}
    }
}));

export default Project;
