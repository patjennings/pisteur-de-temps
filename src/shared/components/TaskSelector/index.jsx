import React, { Component } from 'react';
import axios from "axios";
import {getUserName, getProjectName, getClientName, getTasksForProject} from 'utils/defsConverter';
import retrieveFormData from "utils/retrieveFormData";

import {toJS} from "mobx";
import {observer, inject} from "mobx-react";

import "./styles.scss";

const TaskSelector = inject("mainStore", "authStore")(observer(class TaskSelector extends Component {
    constructor(props){
	super(props);

	this.props.mainStore.setActiveTaskInput(null); // reset la task quand on réinitialise l'objet
	// ceci est possible grâce à la key posée sur l'appel du composant, qui le remonte donc et relance le constructeur. 
	
	this.state = {
	    activeProject: this.props.activeProject,
	    activeTask: null
	};

	// binds
	this.handleDropdownChange = this.handleDropdownChange.bind(this);
	this.submitNewTask = this.submitNewTask.bind(this);
    }

    // componentWillUpdate(){
    // 	this.props.activeProject !== this.state.activeProject ? console.log("change project") : console.log("same project");
    // }
    
    handleDropdownChange(e){
	e.preventDefault();

	console.log(e);
	
	// on point e.currentTarget pour obtenir l'élément qui a le handler, et pas l'enfant sur lequel on clicke (qui est e.target)

	// let projectId; // get the id
	this.props.mainStore.setActiveTaskInput(e.currentTarget.innerText);
	this.props.onChange(this.state.activeTaskInput);
    }
    submitNewTask(e){
	e.preventDefault();
	const newTask = document.getElementById("task-input--task").value;
	
	if(newTask !== ""){
	    const reqBody = {"task": newTask};
	    this.props.mainStore.updateProject(this.props.activeProject, reqBody);
	    this.props.mainStore.setActiveTaskInput(newTask);
	    this.props.onChange(this.state.activeTaskInput);
	} else {
	    console.log("task is empty. Cannot update");
	}
    }


    render() {

	let buttonClass = "btn btn-info dropdown-toggle btn-block";
	const AriaDisabledState = this.props.activeProject == null ? "true" : "false";
	this.props.activeProject == null ? buttonClass+=" disabled" : null;

	const tasks = getTasksForProject(this.props.mainStore.projectsDefinitions, this.props.activeProject);
	
	return (
	    <div className="dropdown" id="track-input--task">
	      <a className={buttonClass} href="#" role="button" id="tasksList" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-disabled={AriaDisabledState}>
		{this.props.mainStore.activeTaskInput == null ? "Select task" : this.props.mainStore.activeTaskInput }
	      </a>

	      <div className="dropdown-menu" aria-labelledby="tasksList">
		
		
		{tasks !== null && tasks.map(t => <a className="dropdown-item" href="#" onClick={this.handleDropdownChange}>{t}</a>)}
		<div className="dropdown-divider"></div>
		
		<input 
	    name="task"
	    id="task-input--task"
	    type="text"
	    placeholder="New task"
	    aria-label="Input"
	    data-parse="number"
	    className="w-50 ml-3 mr-1"/>
		
	    
		<button
	    className="btn btn-primary" onClick={this.submitNewTask}>Add</button>
		</div>
		</div>
		
	);
    }
}));

export default TaskSelector;
