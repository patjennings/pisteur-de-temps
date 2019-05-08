import React, { Component } from 'react';
import {readableDate} from "utils/readableDate";
import { getClientName, getProjectName, getUserName } from "utils/defsConverter";
import retrieveFormData from "utils/retrieveFormData";

import {toJS} from "mobx";
import {inject, observer} from "mobx-react";

import ProjectsSelector from "sharedComponents/ProjectsSelector";

import "./styles.scss";

const Task = inject("mainStore", "authStore")(observer(class Task extends Component {
    constructor(props){
	super(props);

	const clid = toJS(this.props.mainStore.projectsDefinitions.find(item => item._id == this.props.mainStore.activeProject)).client;
	
	this.state = {
	    projectName: getProjectName(this.props.mainStore.projectsDefinitions, this.props.mainStore.activeProject),
	    clientId: this.props.mainStore.activeProjectDetails.client,
	    clientName: getClientName(this.props.mainStore.clientsDefinitions, this.props.mainStore.activeProjectDetails.client),
	    isEdited: false,
	    activeProject: this.props.mainStore.activeProject
	};
	
	// binds
	this.deleteItem = this.deleteItem.bind(this);
	this.editItem = this.editItem.bind(this);
	this.cancelEdit = this.cancelEdit.bind(this);
	this.setActiveProject = this.setActiveProject.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
	console.log(toJS(this.props.mainStore.activeProjectDetails));
    }

    componentDidUpdate(){
	if(this.state.isEdited){
	    this.populateFields();
	}
    }

    
    deleteItem(e){
	this.props.mainStore.deleteTask(this.props.mainStore.activeProject, this.props.taskid);
    }
    editItem(e){
	this.setState({isEdited: true});
    }
    cancelEdit(e){
	this.setState({isEdited: false});
    }

    populateFields(){
	console.log("populate fields");
	let inputValue = document.getElementById("track-input--value-"+this.props.taskid);
	let inputComment = document.getElementById("track-input--comment-"+this.props.taskid);
	let inputTask = document.getElementById("track-input--task-"+this.props.taskid);
	
	inputValue.value = this.props.value;
	inputComment.value = this.props.comment;
	inputTask.value = this.props.task;
    }
    
    handleSubmit(e){
	console.log("submit");
	e.preventDefault();
	let fd = retrieveFormData(e.target, this.props.authStore.userId);
	
	// on lance la requête
	this.props.mainStore.updateTask(this.state.activeProject, this.props.taskid, fd);

	// const cli = toJS(this.props.mainStore.projectsDefinitions.find(item => item._id == this.state.activeProject)).client;
	
	this.setState({
	    isEdited: false
	});	
    }

    setActiveProject(p){
	this.setState({activeProject: p});	
    }
    
    render() {
	// console.log(this.props.date);
	// console.log(this.props.mainStore.activeProjectDetails._id);
	if(this.state.isEdited){
	    return (
		<div className="track edited">	  
		  <form onSubmit={this.handleSubmit}>
		    <input className="form-control"
			   name="task"
			   id={"track-input--task-"+this.props.taskid}
			   type="text"
			   placeholder="Task description"
			   aria-label="Input"/>
		    
		    <input className="form-control"
			   name="value"
			   id={"track-input--value-"+this.props.taskid}
			   type="text"
			   placeholder="Time"
			   aria-label="Input"
			   data-parse="number"/>
		    <input className="form-control"
			   name="comment"
			   id={"track-input--comment-"+this.props.taskid}
			   type="text"
			   placeholder="Write a comment"
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
		<div className="track">
		  {this.props.task} -
		  {this.props.value} -
		  {this.props.comment} -
		  {getUserName(this.props.mainStore.usersDefinitions, this.props.user)} - 
		  {readableDate(this.props.date)}
		  <a className="track-edit d-flex align-items-center" href="#" data-toggle="tooltip" data-placement="top" title="Edit" onClick={this.editItem}><i className="ico ico-medium">pen</i></a>
		  <a className="track-delete d-flex align-items-center" href="#" data-toggle="tooltip" data-placement="top" title="Delete" onClick={this.deleteItem}><i className="ico ico-medium ico-trash">trash</i></a>
		</div>
	    );

	}
    }
}));

export default Task;


// <div className="edition" id={this.props.taskid}>
// 		  <form onSubmit={this.handleSubmit}>
// 		    <div className="row">
// 		      <div className="col-4">
// 			<label htmlFor="track-input--value" className="small text-muted">Enter time</label>
// 			<input className="form-control"
// 			       name="value"
// 			       id={"track-input--value-"+this.props.taskid}
// 			       type="text"
// 			       placeholder="Time"
// 			       aria-label="Input"
// 			       data-parse="number"/>
// 		      </div>
// 		      <div className="col-4">
// 			<label htmlFor="track-input--task">Task</label>
// 			<input className="form-control"
// 			       name="task"
// 			       id={"track-input--task-"+this.props.taskid}
// 			       type="text"
// 			       placeholder="Task description"
// 			       aria-label="Input"/>

// 		      </div>
// 		      <div className="col-4">
// 			<label htmlFor="track-input--comment">Comment</label>
// 			<textarea className="form-control"
// 				  name="comment"
// 				  id={"track-input--comment-"+this.props.taskid}
// 				  type="text"
// 				  placeholder="Write a comment"
// 				  aria-label="Input"/>
// 		      </div>
// 		    </div>
// 		    <button
// 		      className="btn btn-primary btn-sm">Update</button>
// 		    <button
// 		      className="btn btn-light btn-sm" onClick={this.cancelEdit}>Cancel</button>
// 		  </form>
// 		  <ProjectsSelector onChange={this.setActiveProject} activeProject={this.state.activeProject}/>
// 		</div>
