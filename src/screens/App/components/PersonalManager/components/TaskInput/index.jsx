import React, { Component } from 'react';
// import App from "../App";
// import axios from "axios";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';
import addTask from "fetch/addTask";
import retrieveFormData from "utils/retrieveFormData";

import {observable, action, decorate} from "mobx";
import {observer} from "mobx-react";

import ProjectsSelector from "sharedComponents/ProjectsSelector";
import "./styles.scss";

const TaskInput = observer(class TaskInput extends Component {
    constructor(props){
	super(props);

	this.state = {
	    activeProject: null
	};

	// binds
	this.handleSubmit = this.handleSubmit.bind(this);
	this.setActiveProject = this.setActiveProject.bind(this);
    }

    async handleSubmit(event){
	event.preventDefault();
	
	let fd = retrieveFormData(event.target, this.state.userId);
	
	// on lance la requête
	let req = await addTask(this.state.activeProject, fd);

	// on invoque le store
	
	this.props.onChange(); // actualise le trackHistory dans le parent
	
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
		    <ProjectsSelector store={this.props.store} onChange={this.setActiveProject}/>
		  </div>
		</div>
	      </form>
	    </div>

	);
    }
})

export default TaskInput;
