import React, { Component } from 'react';
import axios from "axios";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import {toJS} from "mobx";
import {observer, inject} from "mobx-react";

import "./styles.scss";

const ProjectsSelector = inject("mainStore")(observer(class ProjectsSelector extends Component {
    constructor(props){
	super(props);


	console.log(this.props.activeProject);
	this.state = {
	    activeProject: this.props.activeProject,
	    relatedClient: null
	};

	// binds
	this.handleDropdownChange = this.handleDropdownChange.bind(this);
	this.checkDarkMode = this.checkDarkMode.bind(this);
    }

    handleDropdownChange(e){
	e.preventDefault();
	
	// on point e.currentTarget pour obtenir l'élément qui a le handler, et pas l'enfant sur lequel on clicke (qui est e.target)

	const projectId = e.currentTarget.getAttribute("id"); // get the id
	const clientName = e.currentTarget.querySelector(".related-client").innerText;

	console.log(clientName);
	
	// if(e.target.nodeName === "SPAN"){ // handle case where child is clicked
	//     projectId = e.currentTarget.parentNode.getAttribute("id");
	//     // clientName = e.currentTarget
	// } else {
	//     projectId = e.currentTarget.getAttribute("id");
	// }
	this.setState({
	    activeProject: projectId,
	    relatedClient: clientName
	});
	this.props.onChange(projectId);
    }
    checkDarkMode(){
	
	if(this.props.darkMode == "true"){
	    // return "dark-mode";
	} else {
	    // return null;
	}
    }

    render() {
	// console.log(this.state.activeProject);
	// const activeClient = this.props.mainStore.projectsDefinitions[0].client;
	// const activeClient = this.props.mainStore.projectsDefinitions.filter(n => n._id === this.state.activeProject).client;
	console.log("/////////");
	let darkClass;
	if(this.props.darkMode == "true"){
	    darkClass="dark-mode";
	} else {
	    darkClass="light-mode";
	}
	// console.log(activeClient);
	
	return (
	    <div className={darkClass}>
	      <div className="dropdown project-selector">
		<button
		  className="dropdown-toggle btn"
		  data-toggle="dropdown"
		  aria-haspopup="true"
		  aria-expanded="false">
		  {this.state.activeProject == null ?
		      <p className="project-placeholder">Select a project</p>
		      :
		      <div className="">
			    <p className="project-name">{getProjectName(this.props.mainStore.projectsDefinitions, this.state.activeProject)}</p>
				<p className="client-name">{this.state.relatedClient}</p>    
			  </div>
		      }
		</button>
		
		
		<div className="dropdown-menu"
		     aria-labelledby="dropdownMenuButton">
		  {
			 this.props.mainStore.projectsDefinitions.map(p => {
			     // console.log(p);
			     return  <a className="dropdown-item" href="#" key={p._id} id={p._id} onClick={this.handleDropdownChange}>{p.name}<div className="text-muted small related-client">{getClientName(this.props.mainStore.clientsDefinitions, p.client)}</div></a>;
			 })
		  }
		</div>
	      </div>
	    </div>
	);
    }
}));

export default ProjectsSelector;
