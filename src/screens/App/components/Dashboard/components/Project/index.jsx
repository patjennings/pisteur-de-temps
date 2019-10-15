import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// import clientDefinitions from '../utils/clientDefinitions';
import Task from "./components/Task";
import axios from "axios";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';
import {getFullTime, getPercent} from 'utils/budget';
import {fetchProjectTrackedTime} from "fetch/agent";

import {convertToUnitValue} from "utils/time";

import {toJS} from "mobx";
import {observer, inject} from "mobx-react";

import "./styles.scss";

const Project = inject("mainStore")(observer(class Project extends Component {
    constructor(props){
	super(props);

	this.state = {
	    timeSpent: 0,
	    timeTotal: this.props.budget,
	    percentageConsumed: 0,
	    timeOverflow: false,
	    height: window.innerHeight - 120
	};

	this.handleChange = this.handleChange.bind(this);

    }
    componentDidMount(){
	// activeProjectDetails
	this.props.mainStore.loadProject(this.props.mainStore.activeProject);
	this.props.mainStore.loadTrackedTime(this.props.mainStore.activeProject);
	
	window.addEventListener('resize',  this.handleResize.bind(this));
    }

    handleResize(){
	this.setState({
	    height: window.innerHeight-120
	})
    }

    handleChange(){
	// console.log("change");
    }

    stats(){
	var ft = getFullTime(toJS(this.props.mainStore.activeTrackedTime));
	return ft;
    }
    
    render() {
	// const timeConsumed = getPercent(this.stats(), this.props.mainStore.activeProjectDetails.budget);
	// const isTimeOver = timeConsumed > 100; // boolean (le budget est-il dépassé ?)
	this.state.percentageConsumed = getPercent(this.stats(), this.props.mainStore.activeProjectDetails.budget);
	this.state.timeOverflow = this.state.percentageConsumed > 100 ? true : false;
	const barColor = this.state.timeOverflow ? "bg-danger" : null;

	const timeBasis = Math.pow(100, 2)/this.state.percentageConsumed;
	const timeOver = (this.state.percentageConsumed-100)*100/this.state.percentageConsumed;

	console.log(this.state.percentageConsumed);

	// console.log(timeConsumed+"%");
	// console.log(timeBasis+"/"+timeOver);
	
	return (
	      
	    <div className={"card project-details "+(this.state.timeOverflow ? "time-overflow" : "")} style={{height: this.state.height+"px"}}>
		<div className="card-header">
		  <div className="row">
		    <div className="col-9">
		      <p className="project-details--client">{getClientName(this.props.mainStore.clientsDefinitions, this.props.mainStore.activeProjectDetails.client)}</p>
		      <h3 className="project-details--name">{this.props.mainStore.activeProjectDetails.name}</h3>
		      <p className="project-details--description">{this.props.mainStore.activeProjectDetails.description}</p>
		    </div>
		    <div className="col-3">
		      <p className="project-details--budget-label">Budget</p>
		      <h4 className="project-details--budget">{convertToUnitValue(this.props.mainStore.activeProjectDetails.budget, this.props.mainStore.unit)}<span className="project-details--budget--unit">{this.props.mainStore.unit == "hour" ? "h." : "j."}</span></h4>
		      <p>{/*{this.stats()}*/}</p>
		    </div>
		  </div>
		  
		  {!this.state.timeOverflow ?
		      <div className="progress" data-toggle="tooltip" data-placement="top" title={this.stats()}>
			    <div className="progress-bar" role="progressbar" style={{width: this.state.percentageConsumed+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
			  </div>
			  :
			  <div className="progress" data-toggle="tooltip" data-placement="top" title={this.stats()}>
				<div className="progress-bar time-basis" role="progressbar" style={{width: timeBasis+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
				    <div className="progress-bar time-over" role="progressbar" style={{width: timeOver+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
			      </div>
			  }
		    
		  
		</div>

		    <ReactCSSTransitionGroup
		      component="div" className="project-tracks"
		      transitionName="fade"
		      transitionEnterTimeout={500}
		      transitionLeaveTimeout={300}>
		      <table className="table">
			<tbody>
		  {this.props.mainStore.activeTrackedTime.slice(0).reverse().map(t => {
		      return <Task key={t._id} taskid={t._id} task={t.task} comment={t.comment} user={t.relatedUser} value={t.value} date={t.dateCreation} onChange={this.handleChange}/>;
		  })}
			</tbody>
		      </table>
		  </ReactCSSTransitionGroup>
	      </div>
	);
    }
}));

export default Project;
