import React, { Component } from 'react';
import {observer, inject} from "mobx-react";
import Project from "./components/Project";
import AddProject from "../AddProject";


import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import "./styles.scss";
import "assets/styles/main.scss";

const ProjectsManager = inject("mainStore", "authStore")(observer(class ProjectsManager extends Component {
    constructor(props){
	super(props);
	this.state = {
	    isAddingProject: false
	};
	this.addProject = this.addProject.bind(this);
	this.handleChange = this.handleChange.bind(this);
    }
    addProject(){
	this.setState({isAddingProject: true});
    }

    handleChange(e){
	// console.log("reset navigation");
	this.setState({isAddingProject: false});
    }
    render() {
	return (
	    <div>
	      <button className="btn btn-primary" type="button" onClick={this.addProject}>Add a project</button>
	       { this.state.isAddingProject ? <AddProject onChange={this.handleChange} /> : null }
	      <ul>
		{this.props.mainStore.projectsDefinitions.map(p => <li key={p._id}><Project key={p._id} projectid={p._id} clientid={p.client} description={p.description} budget={p.budget} hasTracks={p.hasTracks}/></li>)}

	      </ul>
	    </div>
	);
    }
}));

export default ProjectsManager;
