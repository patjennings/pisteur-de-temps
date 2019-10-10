import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Task from "./components/Task";
import TaskInput from "./components/TaskInput";

// import axios from "axios";
import {observable, action, decorate, toJS} from "mobx";
import {inject, observer} from "mobx-react";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import "./styles.scss";

const PersonalManager = inject("mainStore", "authStore")(observer(class PersonalManager extends Component {
    constructor(props){
	super(props);
	// binds
	this.handleClick = this.handleClick.bind(this);
	this.handleChange = this.handleChange.bind(this);

	this.state = {
	    height: window.innerHeight - 120
	};
	
    }
    
    componentDidMount() {
	this.props.mainStore.loadPersonalHistory();
	this.handleResize();
        window.addEventListener('resize',  this.handleResize.bind(this));
    }
    handleResize(){
	this.setState({
	    height: window.innerHeight-120
	})
    }

    handleChange(data, event){
	data ? this.props.onChange(data.relatedProject) : null;
    }
    
    handleClick(data, event){
	// this.props.onChange(data.relatedProject);
	this.props.mainStore.setShowProject(true);
	this.props.mainStore.setActiveProject(data.relatedProject);
    }
    
    render() {
	console.log("Personal Manager is rendered");
	console.log(this.props.mainStore.trackHistory);

	return (
	    
	    <div className="card track-manager" style={{height: this.state.height+"px"}}>

	      {/* --------- */}
	      {/* New track */}
	      <TaskInput store={this.props.mainStore} onChange={this.handleChange} />

	      {/* ------------- */}
	      {/* Track history */}
	      <ReactCSSTransitionGroup
		component="ul" className="list-group list-group-flush track-history"
		transitionName="fade"
		transitionEnterTimeout={500}
		transitionLeaveTimeout={300}>
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
		      userid={this.props.authStore.userId}
		      onChange={event => this.handleChange(childData, event)}
			/>;
		  })}
	      </ReactCSSTransitionGroup>
	    </div>
	);
    }
}));

decorate(PersonalManager, {
    handleClick: action
})

export default PersonalManager;


// .slice(0).reverse().map( etc.) copy le tableau en entrée, le retourne, et map notre fonction avec !
