import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';
import AddProject from "../AddProject";

import {toJS} from "mobx";
import {inject, observer} from "mobx-react";

const ListClientProjects = inject("mainStore")(observer(class ListClientProjects extends Component {
    constructor(props){
	super(props);
	this.state = {
	    hasProject: false,
	    isAddProject: false
	};
	this.handleClick = this.handleClick.bind(this);
	this.handleChange = this.handleChange.bind(this);
	this.addProject = this.addProject.bind(this);
    }

    checkNoProject(){
	if(this.state.hasProject === false){
	    return <p className="text-muted">No project defined</p>;
	}
    }

    addProject(){
	this.setState({isAddingProject: true});
    }
    
    handleClick(item, event){
	this.props.mainStore.setActiveProject(item._id);
	this.props.mainStore.setShowProject(true);
	// console.log(item._id);
    }
    handleChange(){
	this.setState({isAddingProject: false});
    }
    
    render() {
	return (
	    <div>
	      <h5 className="client-name d-flex justify-content-between align-items-center ">
		<span>{this.props.name}</span>
		<a className="project-add d-flex align-items-center" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Add a project"><i className="ico" onClick={this.addProject}>plus_circle</i></a>
	      </h5>
	      { this.state.isAddingProject ? <AddProject onChange={this.handleChange} clientId={this.props.id}/> : null }
	      <ul>
		<ReactCSSTransitionGroup
		      transitionName="fade"
		      transitionEnterTimeout={500}
		      transitionLeaveTimeout={300}>
		{this.props.mainStore.projectsDefinitions.map(p => {
		    if(p.client === this.props.id){
			this.state.hasProject = true;
			return <li key={p._id} id={p._id} onClick={e => this.handleClick(p, e)}>{p.name}</li>;
		    }
		})}
		</ReactCSSTransitionGroup>
		{this.checkNoProject()}
	      </ul>
	    </div>
	);
    }
}));

export default ListClientProjects;
