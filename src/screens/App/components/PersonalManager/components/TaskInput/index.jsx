import React, { Component } from 'react';

import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';
import retrieveFormData from "utils/retrieveFormData";

import {observable, action, decorate} from "mobx";
import {inject, observer} from "mobx-react";

import ProjectsSelector from "sharedComponents/ProjectsSelector";
import "./styles.scss";

const TaskInput = inject("mainStore")(observer(class TaskInput extends Component {
    constructor(props){
	super(props);

	this.state = {
	    activeProject: null
	};

	// binds
	this.handleSubmit = this.handleSubmit.bind(this);
	this.setActiveProject = this.setActiveProject.bind(this);
    }

    handleSubmit(event){
	event.preventDefault();
	let fd = retrieveFormData(event.target, this.props.mainStore.userId);
	
	this.props.mainStore.postNewTask(this.state.activeProject, fd);
    }

    setActiveProject(p){
	this.setState({activeProject: p});
    }


    render() {
	return (
	    <div className="card-header track-input">
	      <form onSubmit={this.handleSubmit}>
		<div className="row">
		  <div className="col">
		    <label htmlFor="track-input--value">Time spent</label>
		    <input className="form-control form-control-lg w-50"
			   name="value"
			   id="track-input--input"
			   type="text"
			   placeholder="Time"
			   aria-label="Input"
			   data-parse="number"/>
		    <label htmlFor="track-input--task">Task</label>
		    <input className="form-control w-100"
			   name="task"
			   id="track-input--input"
			   type="text"
			   placeholder="Task description"
			   aria-label="Input"/>
		    <label htmlFor="track-input--comment">Comment</label>
		    <textarea className="form-control w-100"
			      name="comment"
			      id="track-input--comment"
			      type="text"
			      placeholder="Write a comment"
			      aria-label="Input"/>
		    
		    <button
		      className="btn btn-primary">Submit</button>
		  </div>
		  <div className="col">
		    <ProjectsSelector onChange={this.setActiveProject}/>
		  </div>
		</div>
	      </form>
	    </div>

	);
    }
}));

export default TaskInput;
