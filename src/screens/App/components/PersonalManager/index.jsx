import React, { Component } from 'react';
import Task from "./components/Task";
import TaskInput from "./components/TaskInput";

// import axios from "axios";
import {observable, action, decorate} from "mobx";
import {inject, observer} from "mobx-react";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import fetchPersonalHistory from "fetch/fetchPersonalHistory";

import "./styles.scss";

const PersonalManager = observer(class PersonalManager extends Component {
    constructor(props){
	super(props);
	this.state = {
	    userId: this.props.userid,
	    trackHistory: []
	};

	// binds
	this.handleClick = this.handleClick.bind(this);
	this.handleChange = this.handleChange.bind(this);
    }
    
    async componentWillMount() {
	let req = await fetchPersonalHistory(this.props.store.userId);

	this.setState({
	    trackHistory: req
	});
    }

    async handleChange(data, event){
	data ? this.props.onChange(data.relatedProject) : null;
	let req = await fetchPersonalHistory(this.state.userId);
	
	this.setState({
	    trackHistory: req
	});
    }
    
    handleClick(data, event){
	// this.props.onChange(data.relatedProject);
	this.props.store.setActiveProject(data.relatedProject);
    }

    render() {
	return (
	    <div className="col-6 track-manager">
	      <div className="card">

		{/* --------- */}
		{/* New track */}
		<TaskInput store={this.props.store} onChange={this.handleChange} />

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
			store={this.props.store}
			  />;
		    })}
		</ul>
	      </div>
	    </div>
	);
    }
});

decorate(PersonalManager, {
    handleClick: action
})

export default PersonalManager;


// .slice(0).reverse().map( etc.) copy le tableau en entrée, le retourne, et map notre fonction avec !
