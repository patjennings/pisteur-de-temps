import React, { Component } from 'react';
// import clientDefinitions from '../utils/clientDefinitions';
import ProjectTrack from "./ProjectTrack";
import axios from "axios";
import {getUserName, getProjectName, getClientName} from '../utils/defsConverter';

class ProjectDetails extends Component {
    constructor(props){
	super(props);
	// il faut absolument initialiser l'objet state, avec des valeurs nulles 
	this.state = {
	    projectId: null,
	    projectName: null,
	    clientId: null,
	    clientName: null,
	    trackedTime: [],
	    fullTime: null,
	    definitions: {}
	};
	this.getFullTime = this.getFullTime.bind(this);
	this.getBudgetPercent = this.getBudgetPercent.bind(this);
	
    }
    componentDidMount(){
	this.setState({
	    projectId: this.props.project,
	    definitions: this.props.defs
	});
	this.getProjectInformations(this.props.project);
	// this.definitions = this.props.defs;
    }
    
    componentWillUpdate(){

    }

    componentDidUpdate(){
	// this.state.definitions = this.props.defs;
    }

    removeItem(item){}

    getFullTime(trackedTime){
	let fullTime = 0;
	trackedTime.forEach(t => {
	    fullTime += t.value;
	});
	return fullTime;
    }
    getBudgetPercent(done, total){
	let result = done*100/total;
	return result;
    }

    async getProjectInformations(projectId){

	const getProject = await axios.get("http://localhost:3000/projects/"+projectId);
	const getTrackedTime = await axios.get("http://localhost:3000/projects/"+projectId+"/trackedtime");
	const trackedList = getTrackedTime.data.message.map(t => {
	    // console.log(getUserName(this.state.definitions, t.relatedUser));
	    return {
		id: t._id,
		task: t.task,
		value: t.value,
		comment: t.comment,
		relatedProject: t.relatedProject,
		username: getUserName(this.state.definitions, t.relatedUser),
		date: t.dateCreation
	    };
	    
	});

	this.setState({
	    projectName: getProject.data.name,
	    projectDescription: getProject.data.description,
	    projectBudget: getProject.data.budget,
	    clientId: getProject.data.client,
	    clientName: getClientName(this.state.definitions, getProject.data.client),
	    trackedTime: trackedList,
	    fullTime: this.getFullTime(getTrackedTime.data.message)
	});
	console.log(this.state);
    }
    shouldComponentUpdate(nextProps, nextState){
	// console.log(nextProps);
	if(nextProps.project === nextState.projectId){
	    return true;
	}
	else {
	    this.setState({
		projectId: nextProps.project,
		definitions: nextProps.defs
	    });
	    this.getProjectInformations(nextProps.project);
	    return false;
	}
    }
    
    render() {
	// console.log("°°°°°° "+this.props.project);
	// console.log(this.state);

	return (
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
		  <div className="progress-bar" role="progressbar" style={{width: this.getBudgetPercent(this.state.fullTime, this.state.projectBudget)+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
	      </div>
	      <table className="table project-tracks">
		{this.state.trackedTime.slice(0).reverse().map(t => {
		    return <ProjectTrack task={t.task} comment={t.comment} username={t.username} value={t.value} date={t.date}/>;
		})}
	      </table>
	    </div>
	);
    }
}

export default ProjectDetails;
