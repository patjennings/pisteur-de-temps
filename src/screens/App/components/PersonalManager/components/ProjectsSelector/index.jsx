import React, { Component } from 'react';
// import App from "../App";
import axios from "axios";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';
import addTask from "utils/addTask";

import "./styles.scss";

class ProjectsSelector extends Component {
    constructor(props){
	super(props);
	this.state = {
	    selectedProject: this.props.active,
	    definitions: this.props.defs,
	};
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
	this.setState({selectedProject: projectId});
	
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
		{this.state.selectedProject == null ? "Select a project" : getProjectName(this.state.definitions, this.state.selectedProject)}
	      </button>
	      
	      
	      <div className="dropdown-menu"
		   aria-labelledby="dropdownMenuButton">
		{Object.keys(this.state.definitions).length !== 0 &&
		    this.state.definitions.projectsDefinitions.map(p => {
			return  <a className="dropdown-item" href="#" key={p._id} id={p._id} onClick={this.handleDropdownChange}>{p.name}<span className="text-muted small">{p.client}</span></a>;
		    })
		}
	      </div>
	    </div>

	);
    }
}

export default ProjectsSelector;
