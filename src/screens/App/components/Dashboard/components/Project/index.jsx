import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
	var ft = getFullTime(toJS(this.props.mainStore.activeTrackedTime));
	return ft;
    }
    
    render() {
	const timeConsumed = getPercent(this.stats(), this.props.mainStore.activeProjectDetails.budget);
	const isTimeOver = timeConsumed > 100; // boolean (le budget est-il dépassé ?)
	const barColor = timeOver ? "bg-danger" : null;

	const timeBasis = Math.pow(100, 2)/timeConsumed;
	const timeOver = (timeConsumed-100)*100/timeConsumed;

	console.log(timeConsumed+"%");
	console.log(timeBasis+"/"+timeOver);

	
	return (
	      
	      <div className="card project-details">
		<div className="card-header">
		  <div className="row">
		    <div className="col-6">
		      <p>{getClientName(this.props.mainStore.clientsDefinitions, this.props.mainStore.activeProjectDetails.client)}</p>
		      <h3>{this.props.mainStore.activeProjectDetails.name}</h3>
		      <p>{this.props.mainStore.activeProjectDetails.description}</p>
		    </div>
		    <div className="col-6">
		      <p>Budget</p>
		      <h4>{this.props.mainStore.activeProjectDetails.budget}</h4>
		      <p>{this.stats()}</p>
		    </div>
		  </div>
		  
		  {!isTimeOver ?
		      <div className="progress" data-toggle="tooltip" data-placement="top" title={this.stats()}>
			    <div className="progress-bar" role="progressbar" style={{width: timeConsumed+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
			  </div>
			  :
			  <div className="progress" data-toggle="tooltip" data-placement="top" title={this.stats()}>
				<div className="progress-bar bg-warning" role="progressbar" style={{width: timeBasis+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
				    <div className="progress-bar bg-danger" role="progressbar" style={{width: timeOver+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
			      </div>
			  }
		    
		  
		</div>

		    <ReactCSSTransitionGroup
		      component="div" className="project-tracks"
		      transitionName="fade"
		      transitionEnterTimeout={500}
		      transitionLeaveTimeout={300}>
		  {this.props.mainStore.activeTrackedTime.slice(0).reverse().map(t => {
		      return <Task key={t._id} taskid={t._id} task={t.task} comment={t.comment} user={t.relatedUser} value={t.value} date={t.dateCreation} onChange={this.handleChange}/>;
		  })}
		  </ReactCSSTransitionGroup>
	      </div>
	);
    }
}));

export default Project;
