import React, { Component } from 'react';
// import clientDefinitions from '../utils/clientDefinitions';
import Task from "./components/Task";
import axios from "axios";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';
import {getfullTime, getPercent} from 'utils/budget';

import fetchProject from "utils/fetchProject";

import "./styles.scss";

class Project extends Component {
    constructor(props){
	super(props);
	// il faut absolument initialiser l'objet state, avec des valeurs nulles 
	this.state = {
	    projectId: null,
	    projectName: null,
	    projectDescription: null,
	    projectBudget: null,
	    clientId: null,
	    clientName: null,
	    trackedTime: [],
	    fullTime: null,
	    definitions: {}
	};
	// this.getFullTime = this.getFullTime.bind(this);
	// this.getBudgetPercent = this.getBudgetPercent.bind(this);
	
    }
    async componentWillMount(){
	
	const req = await fetchProject(this.props.projectid, this.props.defs); // on attend que la requête soit bien éxécutée, avant d'avertir du changement
	
	this.setState({
	    ...req,
	    definitions: this.props.defs
	}); // on remplit le state avec : - notre réponse de fetchProject - notre liste de définitions
    }
    async shouldComponentUpdate(nextProps, nextState){
	// console.log(nextProps);
	// console.log(nextState);
	// console.log("Update ?");

	// const req = await fetchProject(this.props.projectid, this.props.defs); // on attend que la requête soit bien éxécutée, avant d'avertir du changement
	
	// this.setState({
	//     ...req,
	//     definitions: this.props.defs
	// }); // on remplit le state avec : - notre réponse de fetchProject - notre liste de définitions
	
	console.log(this.state);
	return true;
    }
    
    render() {
	// console.log("°°°°°° "+this.props.projectid);
	// console.log(this.state);

	return (
	    <div className="col-6 project-details">
	      <div className="card">
		<div className="card-header">
		  <div className="row">
		    <div className="col-6">
		      <p>{this.state.clientName}</p>
		      <h3>{this.state.projectName}</h3>
		      <p>{this.state.projectDescription}</p>
		    </div>
		    <div className="col-6">
		      <p>Budget</p>
		      <h4>{this.state.projectBudget}</h4>
		    </div>
		  </div>
		  <div className="progress" data-toggle="tooltip" data-placement="top" title={this.state.fullTime+" days spent"}>
		    <div className="progress-bar" role="progressbar" style={{width: getPercent(this.state.fullTime, this.state.projectBudget)+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
		  </div>
		</div>
		<table className="table project-tracks">
		  {this.state.trackedTime.slice(0).reverse().map(t => {
		      return <Task key={t.id} task={t.task} comment={t.comment} username={t.username} value={t.value} date={t.date}/>;
		  })}
		</table>
	      </div>
	    </div>
	);
    }
}

export default Project;
