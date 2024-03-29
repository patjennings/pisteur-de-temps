import React, { Component } from 'react';
import axios from 'axios';
import "assets/styles/main.scss";

import {toJS} from "mobx";
import {observer, inject} from "mobx-react";

import { readableDate } from "utils/readableDate";
import { getClientName, getProjectName } from "utils/defsConverter";
import { convertToUnitValue } from "utils/time";

import retrieveFormData from "utils/retrieveFormData";
import ProjectsSelector from "sharedComponents/ProjectsSelector";

const Task = inject("mainStore", "authStore")(observer(class Task extends Component {
    constructor(props){
	super(props);

	// get the client id
	// const clid = this.props.mainStore.projectsDefinitions.find(item => item._id == this.props.relatedProject).client;
	// ^^^^^^^^^^^^^^^^^^^^^
	// LÀ, PROBLÈME !!

	this.state = {
	    projectName: "…",
	    clientId: "5d9e452ede629f58d3e09f14",
	    clientName: "…",
	    isEdited: false,
	    activeProject: this.props.relatedProject
	};

	// binds
	this.deleteItem = this.deleteItem.bind(this);
	this.editItem = this.editItem.bind(this);
	this.cancelEdit = this.cancelEdit.bind(this);
	this.setActiveProject = this.setActiveProject.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.formatValue = this.formatValue.bind(this);
    }

    componentDidMount() {
	let clid = this.props.mainStore.projectsDefinitions.find(item => item._id == this.props.relatedProject).client;
	let pr = getProjectName(this.props.mainStore.projectsDefinitions, this.props.relatedProject);
	let cl = getClientName(this.props.mainStore.clientsDefinitions, clid);
	
	this.setState({
	    projectName: pr,
	    clientId: clid,
	    clientName: cl
	});
	    
    }
    componentDidUpdate(){
	if(this.state.isEdited){
	    this.populateFields();
	}
    }

    deleteItem(e){
	this.props.mainStore.deleteTask(this.props.relatedProject, this.props.id);
    }
    
    editItem(e){
	this.setState({isEdited: true});
    }
    cancelEdit(){
	this.setState({isEdited: false});
    }
    
    handleSubmit(e){
	e.preventDefault();
	let fd = retrieveFormData(e.target, this.props.authStore.userId, this.props.mainStore.unit);
	// on lance la requête
	this.props.mainStore.updateTask(this.state.activeProject, this.props.id, fd);

	const cli = toJS(this.props.mainStore.projectsDefinitions.find(item => item._id == this.state.activeProject)).client;
	this.setState({
	    projectName: getProjectName(this.props.mainStore.projectsDefinitions, this.state.activeProject),
	    // clientId: cli,
	    clientName: getClientName(this.props.mainStore.clientsDefinitions, cli),
	    isEdited: false
	});	
    }
    
    setActiveProject(p){
	this.setState({activeProject: p});	
    }

    populateFields(){
	let inputValue = document.getElementById("track-input--value-"+this.props.id);
	let inputComment = document.getElementById("track-input--comment-"+this.props.id);
	let inputTask = document.getElementById("track-input--task-"+this.props.id);
	
	inputValue.value = convertToUnitValue(this.props.value, this.props.mainStore.unit).toFixed(2);
	inputComment.value = this.props.comment;
	inputTask.value = this.props.task;
    }

    formatValue(value){
	let valFormat = value;
	
	if(value % 1 !== 0){ // si c'est un nombre flottant, on applique un format particulier à la décimale
	    const val = value.toFixed(2);
	    const valSplit = val.split(".");
	    valFormat =  <span className="value--float">{valSplit[0]}<span className="value--decimal">.{valSplit[1]}</span></span>;
	} 
	
	return valFormat;
    }
    
    render(){
	console.log("new task render");
	const taskValue = convertToUnitValue(this.props.value, this.props.mainStore.unit); // convertit le temps de la task à l'unité courante (jour ou heure)

	if(this.state.isEdited){
	    return(
		<li className="list-group-item track-history--item" id={this.props.id}>
		  <form onSubmit={this.handleSubmit}>
		    <label htmlFor="track-input--value">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].dashboard.personal_manager.time_enter}</label>
		    <input className="form-control form-control-lg w-50"
			   name="value"
			   id={"track-input--value-"+this.props.id}
			   type="text"
			   placeholder=""
			   aria-label="Input"
			   data-parse="number"/>
		    <label htmlFor="track-input--task">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].dashboard.personal_manager.task.task}</label>
		    <input className="form-control w-100"
			   readOnly
			   name="task"
			   id={"track-input--task-"+this.props.id}
			   type="text"
			   placeholder=""
			   aria-label="Input"/>
		    <label htmlFor="track-input--comment">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].dashboard.personal_manager.comment_label}</label>
		    <textarea className="form-control w-100"
			      name="comment"
			      id={"track-input--comment-"+this.props.id}
			      type="text"
			      placeholder={this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].dashboard.personal_manager.write_comment}
			      aria-label="Input"/>
		    <button
		      className="btn btn-primary">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].dashboard.personal_manager.task.update}</button>
		    <button
		      className="btn btn-light" onClick={this.cancelEdit}>{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].global.cancel}</button>
		  </form>
		  {/*<ProjectsSelector onChange={this.setActiveProject} activeProject={this.state.activeProject}/> */}
		</li>
	    );
	}
	else
	{
	    // Component on read
	    return(
		<li className="list-group-item track-history--item" id={this.props.id} onClick={this.props.onClick}>
		  <div className="dropdown item-actions position-absolute">
		    <button className="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		      <i className="ico ico-dots_v">dots_v</i>
		    </button>
		    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
		      <a className="dropdown-item" href="#" onClick={this.editItem}>{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].dashboard.personal_manager.task.edit}</a>
		      <a className="dropdown-item" href="#" onClick={this.deleteItem}>{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].dashboard.personal_manager.task.delete}</a>
		    </div>
		  </div>

		  <div className="row">
		    <div className="col-2 item-value"><div className="item-value--inner">{this.formatValue(taskValue)} <span className="item-value--unit">{this.props.mainStore.unit == "hour" ? this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].hour_short : this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].day_short }</span></div></div>
		    <div className="col-10 item-details">
		      <h4 className="item-details--title">{this.props.task}</h4>
		      <p className="item-details--description">{this.props.comment}</p>
		    </div>
		  </div>
		  <div className="row">
		    <div className="offset-2 col-5 text-muted">
		      <strong>{this.state.projectName}</strong>  {this.state.clientName}
		    </div>
		    <div className="col-5 text-muted">
		      {readableDate(this.props.date)}
		    </div>
		  </div>

		</li>

	    );
	}
    }
}));

export default Task;

// <div className="dropdown item-actions position-absolute">
// 		    <button className="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
// 		      <i className="ico ico-dots_v">dots_v</i>
// 		    </button>
// 		    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
// 		      <a className="dropdown-item" href="#" onClick={this.editItem}>Éditer</a>
// 		      <a className="dropdown-item" href="#" onClick={this.deleteItem}>Supprimer</a>
// 		    </div>
// 		  </div>

// 		  <div className="row">
// 		    <div className="col-2 item-value"><div className="item-value--inner">{this.formatValue(taskValue)} <span className="item-value--unit">{this.props.mainStore.unit == "hour" ? "h." : "j." }</span></div></div>
// 		    <div className="col-10 item-details">
// 		      <h4 className="item-details--title">{this.props.task}</h4>
// 		      <p className="item-details--description">{this.props.comment}</p>
// 		    </div>
// 		  </div>
// 		  <div className="row">
// 		    <div className="offset-2 col-5 text-muted">
// 		      <strong>{this.state.projectName}</strong>  {this.state.clientName}
// 		    </div>
// 		    <div className="col-5 text-muted">
// 		      {readableDate(this.props.date)}
// 		    </div>
// 		  </div>
