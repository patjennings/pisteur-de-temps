import React, { Component } from 'react';
// import App from "../App";
import axios from "axios";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';
import addTask from "utils/addTask";
import retrieveFormData from "utils/retrieveFormData";

import ProjectsSelector from "sharedComponents/ProjectsSelector";
import "./styles.scss";

class TaskInput extends Component {
    constructor(props){
	super(props);

	this.state = {
	    userId: this.props.userid,
    	    definitions: this.props.defs,
	    activeProject: null
	};
	this.handleSubmit = this.handleSubmit.bind(this);
	this.setActiveProject = this.setActiveProject.bind(this);
    }

    async handleSubmit(event){
	event.preventDefault();
	
	let fd = retrieveFormData(event.target, this.state.userId);
	
	// on lance la requête
	let req = await addTask(this.state.activeProject, fd);
	this.props.onChange();
	
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
		    <label htmlFor="track-input--value">Enter time</label>
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
		    <ProjectsSelector defs={this.state.definitions} onChange={this.setActiveProject} active={this.state.activeProject}/>
		  </div>
		</div>
	      </form>
	    </div>

	);
    }
}

export default TaskInput;
