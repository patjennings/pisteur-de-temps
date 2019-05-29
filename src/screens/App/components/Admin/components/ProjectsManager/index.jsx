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
	      <div className="projects-header pane-header">
		<div className="actions">
		  <button className="btn btn-primary" type="button" onClick={this.addProject}>Add a project</button>
		</div>
		<div className="column-name">
		  <div className="row">
		    <div className="col-2">
		      Client
		    </div>
		    <div className="col-4">
		      Project & description
		    </div>
		    <div className="col-2">
		      Budget
		    </div>
		    <div className="col-4">
		      Utilisateurs
		    </div>
		  </div>
		</div>
	      </div>
	      <div className="projects-content pane-content">
		<ul>
		  { this.state.isAddingProject ? <li className="new"><AddProject onChange={this.handleChange} /></li>: null }
		  {this.props.mainStore.projectsDefinitions.map(p => <Project key={p._id} projectid={p._id} clientid={p.client} description={p.description} budget={p.budget} hasTracks={p.hasTracks}/>)}
                </ul>
	      </div>
            </div>
	);
    }
}));

export default ProjectsManager;
