import React, { Component } from 'react';
import Task from "./components/Task";
import TaskInput from "./components/TaskInput";
import Toto from "./components/Toto";

import axios from "axios";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import fetchPersonalHistory from "utils/fetchPersonalHistory";

import "./styles.scss";

class PersonalManager extends Component {
    constructor(props){
	super(props);
	this.state = {
	    userId: this.props.user,
	    trackHistory: [],
	    definitions: this.props.defs
	};
	this.handleClick = this.handleClick.bind(this);
	this.handleChange = this.handleChange.bind(this);
	this.handleDropdown = this.handleDropdown.bind(this);
	// this.trackInputAdded = this.trackInputAdded.bind(this);
	// this.fetch = this.fetch.bind(this);
    }
    
    async componentDidMount() {
	let req = await fetchPersonalHistory(this.props.user);
	// console.log(req);

	this.setState({
	    trackHistory: req
	});
    }

    handleClick(data, event){
	this.props.onChange(data.relatedProject);
    }

    async handleChange(data, event){
	data ? this.props.onChange(data.relatedProject) : null;
	let req = await fetchPersonalHistory(this.props.user);
	
	this.setState({
	    trackHistory: req
	});
    }

    handleDropdown(e){
	let projectId = e.target.getAttribute("id");
	this.setState({selectedProject: projectId});
    }


    render() {
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
		      return <Task onClick={e => this.handleClick(childData, e)} key={childData.id} id={childData.id} task={childData.task} value={childData.value} comment={childData.comment} relatedProject={childData.relatedProject} date={childData.date} user={this.state.userId}  onChange={e => this.handleChange(childData, e)}/>;
		    })}
		</ul>
	      </div>
	    </div>
	);
    }
}

export default PersonalManager;


// .slice(0).reverse().map( etc.) copy le tableau en entrée, le retourne, et map notre fonction avec !
