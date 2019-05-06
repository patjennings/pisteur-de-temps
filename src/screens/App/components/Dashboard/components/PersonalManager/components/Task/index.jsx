import React, { Component } from 'react';
import axios from 'axios';
import "assets/styles/main.scss";
import "./styles.scss";

import {toJS} from "mobx";
import {observer, inject} from "mobx-react";

import { readableDate } from "utils/readableDate";
import { getClientName, getProjectName } from "utils/defsConverter";

import retrieveFormData from "utils/retrieveFormData";
import ProjectsSelector from "sharedComponents/ProjectsSelector";

const Task = inject("mainStore")(observer(class Task extends Component {
    constructor(props){
	super(props);

	// get the client id
	const clid = toJS(this.props.mainStore.projectsDefinitions.find(item => item._id == this.props.relatedProject)).client;
	this.state = {
	    projectName: getProjectName(this.props.mainStore.projectsDefinitions, this.props.relatedProject),
	    // clientId: clid,
	    clientName: getClientName(this.props.mainStore.clientsDefinitions, clid),
	    isEdited: false,
	    activeProject: this.props.relatedProject
	};

	// binds
	this.deleteItem = this.deleteItem.bind(this);
	this.editItem = this.editItem.bind(this);
	this.cancelEdit = this.cancelEdit.bind(this);
	this.setActiveProject = this.setActiveProject.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
	//
    }
    componentDidUpdate(){
	if(this.state.isEdited){
	    this.populateFields();
	}
    }

    deleteItem(e){
	this.props.mainStore.deleteTask(this.props.relatedProject, this.props.id);
    }
    
    editItem(e){
	this.setState({isEdited: true});
    }
    cancelEdit(){
	this.setState({isEdited: false});
    }
    
    handleSubmit(e){
	e.preventDefault();
	let fd = retrieveFormData(e.target, this.props.mainStore.userId);
	// on lance la requête
	this.props.mainStore.updateTask(this.state.activeProject, this.props.id, fd);

	const cli = toJS(this.props.mainStore.projectsDefinitions.find(item => item._id == this.state.activeProject)).client;
	this.setState({
	    projectName: getProjectName(this.props.mainStore.projectsDefinitions, this.state.activeProject),
	    // clientId: cli,
	    clientName: getClientName(this.props.mainStore.clientsDefinitions, cli),
	    isEdited: false
	});	
    }
    
    setActiveProject(p){
	this.setState({activeProject: p});	
    }

    populateFields(){
	let inputValue = document.getElementById("track-input--value-"+this.props.id);
	let inputComment = document.getElementById("track-input--comment-"+this.props.id);
	let inputTask = document.getElementById("track-input--task-"+this.props.id);
	
	inputValue.value = this.props.value;
	inputComment.value = this.props.comment;
	inputTask.value = this.props.task;
    }

    render(){
	console.log("new task render");
	const clid = toJS(this.props.mainStore.projectsDefinitions.find(item => item._id == this.props.relatedProject)).client;
	this.state.projectName = getProjectName(this.props.mainStore.projectsDefinitions, this.props.relatedProject);
	this.state.clientName  = getClientName(this.props.mainStore.clientsDefinitions, clid);
	   
	// console.log(toJS(this.props.mainStore));
	// console.log(toJS(this.props.mainStore.projectsDefinitions));
	if(this.state.isEdited){
	    return(
		<li className="list-group-item track-history--item" id={this.props.id}>
		  <form onSubmit={this.handleSubmit}>
		   <label htmlFor="track-input--value">Enter time</label>
		    <input className="form-control form-control-lg w-50"
			   name="value"
			   id={"track-input--value-"+this.props.id}
			   type="text"
			   placeholder="Time"
			   aria-label="Input"
			   data-parse="number"/>
		    <label htmlFor="track-input--task">Task</label>
		    <input className="form-control w-100"
			   name="task"
			   id={"track-input--task-"+this.props.id}
			   type="text"
			   placeholder="Task description"
			   aria-label="Input"/>
		    <label htmlFor="track-input--comment">Comment</label>
		    <textarea className="form-control w-100"
			      name="comment"
			      id={"track-input--comment-"+this.props.id}
			      type="text"
			      placeholder="Write a comment"
			      aria-label="Input"/>
		    <button
		      className="btn btn-primary">Update</button>
		    <button
		      className="btn btn-light" onClick={this.cancelEdit}>Cancel</button>
		  </form>
		  <ProjectsSelector onChange={this.setActiveProject} activeProject={this.state.activeProject}/>
		</li>
	    );
	}
	else
	{
	    // Component on read
	    return(
		<li className="list-group-item track-history--item" id={this.props.id} onClick={this.props.onClick}>
		  <div className="dropdown item-actions position-absolute">
		    <button className="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		      <i className="ico ico-dots_v">dots_v</i>
		    </button>
		    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
		      <a className="dropdown-item" href="#" onClick={this.deleteItem}>Supprimer</a>
		      <a className="dropdown-item" href="#" onClick={this.editItem}>Éditer</a>
		    </div>
		  </div>

		  <div className="row">
		    <div className="col-2 item-value"><div className="item-value--inner">{this.props.value}</div></div>
		    <div className="col-10">
		      <h4>{this.props.task}</h4>
		      <p>{this.props.comment}</p>
		    </div>
		  </div>
		  <div className="row">
		    <div className="offset-2 col-5 text-muted">
		      <strong>{this.state.projectName}</strong>  {this.state.clientName}
		    </div>
		    <div className="col-5 text-muted">
		      {readableDate(this.props.date)}
		    </div>
		  </div>
		</li>

	    );
	}
    }
}));

export default Task;