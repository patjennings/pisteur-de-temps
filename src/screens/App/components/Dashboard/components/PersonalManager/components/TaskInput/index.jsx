import React, { Component } from 'react';

import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';
import retrieveFormData from "utils/retrieveFormData";

// import {observable, action, decorate} from "mobx";
import {inject, observer} from "mobx-react";

import ProjectsSelector from "sharedComponents/ProjectsSelector";
import TaskSelector from "sharedComponents/TaskSelector";

import { convertToUnitValue } from "utils/time";

const TaskInput = inject("mainStore", "authStore")(observer(class TaskInput extends Component {
    constructor(props){
	super(props);

	this.state = {
	    activeProject: null,
	    selectedTask: this.props.mainStore.activeTask,
	    hasErrors: false,
	    errorOnTime: false,
	    errorOnTask: false,
	    errorOnProject: false
	};

	// binds
	this.handleSubmit = this.handleSubmit.bind(this);
	this.setActiveProject = this.setActiveProject.bind(this);
	this.setTask = this.setTask.bind(this);
    }

    handleSubmit(event){
	event.preventDefault();

	const timeField = document.getElementById("track-input--value");
	const taskField = document.getElementById("track-input--task");

	timeField.value == "" ? this.state.errorOnTime = true : this.state.errorOnTime = false;
	// taskField.value == "" ? this.state.errorOnTask = true : this.state.errorOnTask = false;
	this.props.mainStore.activeTaskInput == null ? this.state.errorOnTask = true : this.state.errorOnTask = false;
	this.state.activeProject == null ? this.state.errorOnProject = true : this.state.errorOnProject = false;
	this.state.hasErrors = true;
	
	
	if (!this.state.errorOnTime && !this.state.errorOnTask && !this.state.errorOnProject){
	    this.state.hasErrors = false;
	    let fd = retrieveFormData(event.target, this.props.authStore.userId, this.props.mainStore.unit);
	    fd.task = this.props.mainStore.activeTaskInput;
	    // console.log(fd);
	    this.props.mainStore.postNewTask(this.state.activeProject, fd);
	}
	
	this.setState({
	    hasErrors: this.state.hasErrors,
	    errorOnTime: this.state.errorOnTime,
	    errorOnTask: this.state.errorOnTask,
	    errorOnProject: this.state.errorOnProject
	});
    }

    setActiveProject(p){
	// this.setState({activeProject: p});
	this.setState({activeProject: p }, () => {
	    console.log(`state: ${this.state}, value: ${p}`); // this is my checking
	});
    }
    setTask(t){
	this.setState({selectedTask: t});
	this.setState({selectedTask: t }, () => {
	    console.log(`state: ${this.state}, value: ${t}`); // this is my checking
	})
    }


    render() {
	const timeAttr = this.state.errorOnTime ? "is-invalid" : null;
	const taskAttr = this.state.errorOnTask ? "is-invalid" : null;
	console.log(this.state.selectedTask);
		
	return (
	    <div className="card-header track-input container">
	      {this.state.hasErrors ? <div className="alert alert-danger" role="alert">
		    You need {this.state.errorOnTime ? "a time spent, " : null }{ this.state.errorOnTask ? "a task, " : null }{ this.state.errorOnProject ? "a related project " : null  }in order to complete
	      </div> : null }
	      <div className="row">
		<div className="col-12">
		  <h6>Add time</h6>
		</div>
	      </div>
	      <form onSubmit={this.handleSubmit}>
		<div className="row mb-3">
		  <div className="col-3 pr-0">
		    <input className={"form-control form-control-lg w-100 "+timeAttr}
			   name="value"
			   id="track-input--value"
			   type="text"
			   placeholder="Time"
			   aria-label="Input"
			   data-parse="number"/>
		  </div>
		  <div className="col-2">
		    <span className="track-input--unit"><h5>{this.props.mainStore.unit == "hour" ? "h." : "j." }</h5></span>
		  </div>
		  <div className="col-7">
		    <ProjectsSelector onChange={this.setActiveProject} darkMode="true"/>
		  </div>
		</div>
		<div className="row mb-3">
		  <div className="col-12">
		    <TaskSelector onChange={this.setTask} activeProject={this.state.activeProject} key={this.state.activeProject}/>
		  </div>
		</div>
		<div className="row mb-3">
		  <div className="col-12">
		    <textarea className="form-control w-100"
			      name="comment"
			      id="track-input--comment"
			      type="text"
			      placeholder="Write a comment"
			      aria-label="Input"/>
		  </div>
		</div>
		<div className="row mb-3">
		  <div className="col-12">
		    <button
		      className="btn btn-primary btn-block track-input--submit">Submit</button>
		  </div>
		</div>
	      </form>
	    </div>

	);
    }
}));

export default TaskInput;
