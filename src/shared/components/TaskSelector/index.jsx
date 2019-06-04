import React, { Component } from 'react';
import axios from "axios";
import {getUserName, getProjectName, getClientName, getTasksForProject} from 'utils/defsConverter';

import {toJS} from "mobx";
import {observer, inject} from "mobx-react";

import "./styles.scss";

const TaskSelector = inject("mainStore")(observer(class TaskSelector extends Component {
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


    render() {

	let buttonClass = "btn btn-secondary dropdown-toggle";
	const AriaDisabledState = this.props.activeProject == null ? "true" : "false";
	this.props.activeProject == null ? buttonClass+=" disabled" : "";

	console.log(getTasksForProject(this.props.mainStore.projectsDefinitions, this.state.activeProject));
	
	return (
	    <div className="dropdown">
	      <a className={buttonClass} href="#" role="button" id="tasksList" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-disabled={AriaDisabledState}>
		{this.props.mainStore.activeTaskInput == null ? "Select task" : this.props.mainStore.activeTaskInput }
	      </a>

	      <div className="dropdown-menu" aria-labelledby="tasksList">

	      </div>
	    </div>
	    
	);
    }
}));

export default TaskSelector;
