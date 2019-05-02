import React, { Component } from 'react';
// import clientDefinitions from '../utils/clientDefinitions';
import Task from "./components/Task";
import axios from "axios";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';
import {getFullTime, getPercent} from 'utils/budget';
import {fetchProjectTrackedTime} from "fetch/agent";

import {toJS} from "mobx";
import {observer, inject} from "mobx-react";

import "./styles.scss";

const Project = inject("mainStore")(observer(class Project extends Component {
    constructor(props){
	super(props);

	// this.state = {}

	this.handleChange = this.handleChange.bind(this);
	// this.stats = this.stats.bind(this);
	// this.getBudgetPercent = this.getBudgetPercent.bind(this);
	
    }
    componentDidMount(){
	// activeProjectDetails
	this.props.mainStore.loadProject(this.props.mainStore.activeProject);
	this.props.mainStore.loadTrackedTime(this.props.mainStore.activeProject);
    }

    handleChange(){
	console.log("change");
    }

    stats(){
	var ft = getFullTime(toJS(this.props.mainStore.activeTrackedTime))
	return ft;
    }
    
    render() {
	console.log(toJS(this.props.mainStore.activeProjectDetails));
	console.log(toJS(this.props.mainStore.activeTrackedTime));
	console.log("Project render");
	// const trackedTime = this.props.mainStore.loadTrackedTime(this.props.mainStore.activeProject);
	// console.log(trackedTime);
	// console.log(toJS(this.props.mainStore.activeTrackedTime))
	
	return (
	    <div className="col-6 project-details">
	      <div className="card">
		<div className="card-header">
		  <div className="row">
		    <div className="col-6">
		      <p>{this.props.mainStore.activeProjectDetails.client}</p>
		      <h3>{this.props.mainStore.activeProjectDetails.name}</h3>
		      <p>{this.props.mainStore.activeProjectDetails.description}</p>
		    </div>
		    <div className="col-6">
		      <p>Budget</p>
		      <h4>{this.props.mainStore.activeProjectDetails.budget}</h4>
		      <p>{this.stats()}</p>
		    </div>
		  </div>
		  <div className="progress" data-toggle="tooltip" data-placement="top" title={this.stats()}>
		    <div className="progress-bar" role="progressbar" style={{width: getPercent(this.stats(), this.props.mainStore.activeProjectDetails.budget)+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
		  </div>
		</div>
		<table className="table project-tracks">
		  {this.props.mainStore.activeTrackedTime.slice(0).reverse().map(t => {
		      return <Task key={t._id} taskid={t._id} task={t.task} comment={t.comment} username={t.username} value={t.value} date={t.date} projectid={this.props.mainStore.activeProject} onChange={this.handleChange}/>;
		  })}
		</table>
	      </div>
	    </div>
	);
    }
}));

export default Project;
