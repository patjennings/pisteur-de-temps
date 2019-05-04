import React, { Component } from 'react';
import axios from "axios";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import {observer, inject} from "mobx-react";

import "./styles.scss";

const ProjectsSelector = inject("mainStore")(observer(class ProjectsSelector extends Component {
    constructor(props){
	super(props);


	console.log(this.props.activeProject);
	this.state = {
	    activeProject: this.props.activeProject
	};

	// binds
	this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    handleDropdownChange(e){
	e.preventDefault();
	
	// on point e.currentTarget pour obtenir l'élément qui a le handler, et pas l'enfant sur lequel on clicke (qui est e.target)

	let projectId; // get the id
	
	if(e.target.nodeName === "SPAN"){ // handle case where child is clicked
	    projectId = e.currentTarget.parentNode.getAttribute("id");
	} else {
	    projectId = e.currentTarget.getAttribute("id");
	}
	this.setState({activeProject: projectId});
	this.props.onChange(projectId);
    }


    render() {
	return (
	    <div className="dropdown project-selector">
	      <button
		className="dropdown-toggle btn"
		data-toggle="dropdown"
		aria-haspopup="true"
		aria-expanded="false">
		{this.state.activeProject == null ?
		    "Select a project" :
		    <div className="">
			  {getProjectName(this.props.mainStore.projectsDefinitions, this.state.activeProject)}
			  <div className="text-muted small">Client Name</div>    
			</div>
		    }
	      </button>
	      
	      
	      <div className="dropdown-menu"
		   aria-labelledby="dropdownMenuButton">
		{
		    this.props.mainStore.projectsDefinitions.map(p => {
			// console.log(p);
			return  <a className="dropdown-item" href="#" key={p._id} id={p._id} onClick={this.handleDropdownChange}>{p.name}<div className="text-muted small">{getClientName(this.props.mainStore.clientsDefinitions, p.client)}</div></a>;
		    })
		}
	      </div>
	    </div>

	);
    }
}));

export default ProjectsSelector;
