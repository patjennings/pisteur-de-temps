import React, { Component } from 'react';
import clientDefinitions from '../utils/clientDefinitions';
import ProjectTrack from "./ProjectTrack";
import axios from "axios";

class ProjectDetails extends Component {
    constructor(props){
	super(props);

	this.definitions = {};
	// il faut absolument initialiser l'objet state, avec des valeurs nulles 
	this.state = {
	    projectId: null,
	    projectName: null,
	    clientId: null,
	    clientName: null,
	    trackedTime: [],
	    fullTime: null 
	};
	this.getFullTime = this.getFullTime.bind(this);
	this.getUserName = this.getUserName.bind(this);
	this.getBudgetPercent = this.getBudgetPercent.bind(this);
	
    }
    componentDidMount(){
	console.log("didMount");
	
    }
    componentDidUpdate(){
	this.definitions = this.props.defs;
    }

    removeItem(item){}
    
    getUserName(userId){
	let result = null;
	const node = this.definitions.usersDefinitions.filter(
	    item => {return item._id == userId;}
	);
	node.map(r => {
	    result = r.firstName;
	});
	return result;
    }

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
	const getClientName = await axios.get("http://localhost:3000/clients/"+getProject.data.client);
	const getTrackedTime = await axios.get("http://localhost:3000/projects/"+projectId+"/trackedtime");
	const trackedList = getTrackedTime.data.message.map(t => {
	    console.log(this.getUserName(t.relatedUser));
	    return {
		id: t._id,
		task: t.task,
		value: t.value,
		comment: t.comment,
		relatedProject: t.relatedProject,
		username: this.getUserName(t.relatedUser),
		date: t.dateCreation
	    };
	    
	});

	this.setState({
	    projectName: getProject.data.name,
	    clientId: getProject.data.client,
	    clientName: getClientName.data.name,
	    trackedTime: trackedList,
	    fullTime: this.getFullTime(getTrackedTime.data.message)
	});
    }
    shouldComponentUpdate(nextProps, nextState){
	if(nextProps.project === nextState.projectId){
	    return true;
	}
	else {
	    this.setState({projectId: nextProps.project});
	    this.getProjectInformations(nextProps.project);
	    return false;
	}
    }
    
    render() {

	return (
	    <div className="card">
	      <div className="card-header">
		<div className="row">
		  <div className="col-6">
		    <p>{this.state.clientName}</p>
		    <h3>{this.state.projectName}</h3>
		    <p>[Description]</p>
		  </div>
		  <div className="col-6">
		    <p>Budget</p>
		    <h4>[Budget]</h4>
		  </div>
		</div>
		<div className="progress" data-toggle="tooltip" data-placement="top" title={this.state.fullTime+" days spent"}>
		  <div className="progress-bar" role="progressbar" style={{width: this.getBudgetPercent(this.state.fullTime, 24)+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
	      </div>
	      <table className="table project-tracks">
		{this.state.trackedTime.map(t => {
		    return <ProjectTrack task={t.task} comment={t.comment} username={t.username} value={t.value} date={t.date}/>;
		})}
	      </table>
	    </div>
	);
    }
}

export default ProjectDetails;
