import React, { Component } from 'react';
import axios from "axios";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';
import addTask from "fetch/addTask";

import {observable, action, decorate} from "mobx";
import {observer} from "mobx-react";

import "./styles.scss";

const ProjectsSelector = observer(class ProjectsSelector extends Component {
    constructor(props){
	super(props);
	
	this.state = {
	    activeProject: this.props.store.activeProject
	};

	// binds
	this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    handleDropdownChange(e){
	e.preventDefault();

	let projectId; // get the id
	
	if(e.target.nodeName === "SPAN"){ // handle case where child is clicked
	    projectId = e.target.parentNode.getAttribute("id");
	} else {
	    projectId = e.target.getAttribute("id");
	}
	this.setState({activeProject: projectId});
	this.props.onChange(projectId);
    }


    render() {
	return (
	    <div className="dropdown">
	      <button
		className="dropdown-toggle btn"
		data-toggle="dropdown"
		aria-haspopup="true"
		aria-expanded="false">
		{this.state.activeProject === null ? "Select a project" : getProjectName(this.props.store.projectsDefinitions, this.state.activeProject)}
	      </button>
	      
	      
	      <div className="dropdown-menu"
		   aria-labelledby="dropdownMenuButton">
		{
		    this.props.store.projectsDefinitions.map(p => {
			console.log(p);
			return  <a className="dropdown-item" href="#" key={p._id} id={p._id} onClick={this.handleDropdownChange}>{p.name}<span className="text-muted small">{p.client}</span></a>;
		    })
		}
	      </div>
	    </div>

	);
    }
})

export default ProjectsSelector;
