import React, { Component } from 'react';

import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';
import retrieveFormData from "utils/retrieveFormData";

// import {observable, action, decorate} from "mobx";
import {inject, observer} from "mobx-react";

import ProjectsSelector from "sharedComponents/ProjectsSelector";
import "./styles.scss";

const TaskInput = inject("mainStore")(observer(class TaskInput extends Component {
    constructor(props){
	super(props);

	this.state = {
	    activeProject: null,
	    errorOnTime: false,
	    errorOnTask: false,
	    errorOnProject: false
	};

	// binds
	this.handleSubmit = this.handleSubmit.bind(this);
	this.setActiveProject = this.setActiveProject.bind(this);
    }

    handleSubmit(event){
	event.preventDefault();

	const timeField = document.getElementById("track-input--value");
	const taskField = document.getElementById("track-input--task");

	timeField.value == "" ? this.state.errorOnTime = true : this.state.errorOnTime = false;
	taskField.value == "" ? this.state.errorOnTask = true : this.state.errorOnTask = false;
	this.state.activeProject == null ? this.state.errorOnProject = true : this.state.errorOnProject = false;

	
	
	if (!this.state.errorOnTime && !this.state.errorOnTask && !this.state.errorOnProject){
	    let fd = retrieveFormData(event.target, this.props.mainStore.userId);
	    this.props.mainStore.postNewTask(this.state.activeProject, fd);
	}
	
	this.setState({
	    errorOnTime: this.state.errorOnTime,
	    errorOnTask: this.state.errorOnTask,
	    errorOnProject: this.state.errorOnProject
	});
    }

    setActiveProject(p){
	this.setState({activeProject: p});
    }


    render() {
	const timeAttr = this.state.errorOnTime ? "is-invalid" : null;
	const taskAttr = this.state.errorOnTask ? "is-invalid" : null;
	
	return (
	    <div className="card-header track-input">
	      <form onSubmit={this.handleSubmit}>
		<div className="row">
		  <div className="col">
		    <label htmlFor="track-input--value">Time spent</label>
		    <input className={"form-control form-control-lg w-50 "+timeAttr}
			   name="value"
			   id="track-input--value"
			   type="text"
			   placeholder="Time"
			   aria-label="Input"
			   data-parse="number"/>
		    {this.state.errorOnTime ? <div className="invalid-feedback">Please Enter a value.</div> : null }
		    <label htmlFor="track-input--task">Task</label>
		    <input className={"form-control w-100 "+taskAttr}
			   name="task"
			   id="track-input--task"
			   type="text"
			   placeholder="Task description"
			   aria-label="Input"/>
		    {this.state.errorOnTask ? <div className="invalid-feedback">Please Enter a task</div> : null }
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
		    {this.state.errorOnProject ? <div className="invalid-feedback">Please select a project</div> : null }
		    <ProjectsSelector onChange={this.setActiveProject} />

		  </div>
		</div>
	      </form>
	    </div>

	);
    }
}));

export default TaskInput;
