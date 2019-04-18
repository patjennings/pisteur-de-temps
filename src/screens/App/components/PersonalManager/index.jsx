import React, { Component } from 'react';
import Task from "./components/Task";
import TaskInput from "./components/TaskInput";

import axios from "axios";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import fetchPersonalHistory from "utils/fetchPersonalHistory";

import "./styles.scss";

class PersonalManager extends Component {
    constructor(props){
	super(props);
	this.state = {
	    userId: this.props.userid,
	    trackHistory: [],
	    definitions: this.props.defs
	};
	this.handleClick = this.handleClick.bind(this);
	this.handleChange = this.handleChange.bind(this);
	// this.handleDropdown = this.handleDropdown.bind(this);
	// this.trackInputAdded = this.trackInputAdded.bind(this);
	// this.fetch = this.fetch.bind(this);
    }
    
    async componentWillMount() {
	let req = await fetchPersonalHistory(this.state.userId);
	// console.log(req);

	this.setState({
	    trackHistory: req
	});
    }

    async handleChange(data, event){
	console.log(data);
	data ? this.props.onChange(data.relatedProject) : null;
	let req = await fetchPersonalHistory(this.state.userId);
	
	this.setState({
	    trackHistory: req
	});
    }
    
    handleClick(data, event){
	this.props.onChange(data.relatedProject);
    }

    // handleDropdown(event){
    // 	let projectId = event.target.getAttribute("id");
    // 	this.setState({selectedProject: projectId});
    // }


    render() {
	// console.log(this.state.trackHistory);
	return (
	    <div className="col-6 track-manager">
	      <div className="card">

		{/* --------- */}
		{/* New track */}
		<TaskInput defs={this.state.definitions} userid={this.state.userId} onChange={this.handleChange} />
		{/*<Toto defs={this.state.definitions} userid={this.state.userId} onChange={this.handleChange}/>*/}

		{/* ------------- */}
		{/* Track history */}
		<ul className="list-group list-group-flush track-history">
		  {this.state.trackHistory.slice(0).reverse().map(childData => {
		      return <Task
				   onClick={event => this.handleClick(childData, event)}
			key={childData.id}
			id={childData.id}
			task={childData.task}
			value={childData.value}
			comment={childData.comment}
			relatedProject={childData.relatedProject}
			date={childData.date}
			userid={this.state.userId}
			onChange={event => this.handleChange(childData, event)}
			defs={this.props.defs}
			  />;
		    })}
		</ul>
	      </div>
	    </div>
	);
    }
}

export default PersonalManager;


// .slice(0).reverse().map( etc.) copy le tableau en entrée, le retourne, et map notre fonction avec !
