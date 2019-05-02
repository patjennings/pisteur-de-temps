import React, { Component } from 'react';
import Task from "./components/Task";
import TaskInput from "./components/TaskInput";

// import axios from "axios";
import {observable, action, decorate} from "mobx";
import {inject, observer} from "mobx-react";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import "./styles.scss";

const PersonalManager = inject("mainStore")(observer(class PersonalManager extends Component {
    constructor(props){
	super(props);
	// console.log(this.props.mainStore);
	// binds
	this.handleClick = this.handleClick.bind(this);
	this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount() {
	this.props.mainStore.loadPersonalHistory();
    }

    handleChange(data, event){
	data ? this.props.onChange(data.relatedProject) : null;
    }
    
    handleClick(data, event){
	// this.props.onChange(data.relatedProject);
	this.props.mainStore.setActiveProject(data.relatedProject);
    }

    render() {
	// console.log("Personal Manager is rendered");
	console.log(this.props.mainStore.isLoading);
	return (
	    <div className="col-6 track-manager">
	      <div className="card">

		{/* --------- */}
		{/* New track */}
		<TaskInput store={this.props.mainStore} onChange={this.handleChange} />

		{/* ------------- */}
		{/* Track history */}
		<ul className="list-group list-group-flush track-history">
		  {this.props.mainStore.trackHistory.slice(0).reverse().map(childData => {
		      return <Task
				onClick={event => this.handleClick(childData, event)}
				key={childData.id}
				id={childData.id}
				task={childData.task}
				value={childData.value}
				comment={childData.comment}
				relatedProject={childData.relatedProject}
				date={childData.date}
				userid={this.props.store.userId}
				onChange={event => this.handleChange(childData, event)}
				store={this.props.mainStore} />;
			    })}
		</ul>
	      </div>
	    </div>
	);
    }
}));

decorate(PersonalManager, {
    handleClick: action
})

export default PersonalManager;


// .slice(0).reverse().map( etc.) copy le tableau en entrée, le retourne, et map notre fonction avec !
