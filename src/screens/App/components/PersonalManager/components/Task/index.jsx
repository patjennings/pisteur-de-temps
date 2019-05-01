import React, { Component } from 'react';
import axios from 'axios';
import "assets/styles/main.scss";
import "./styles.scss";

import {observable, action, decorate} from "mobx";
import {observer} from "mobx-react";

import {readableDate} from "utils/readableDate";
import deleteTask from "fetch/deleteTask";
import updateTask from "fetch/updateTask";
import retrieveFormData from "utils/retrieveFormData";
import ProjectsSelector from "sharedComponents/ProjectsSelector";

const Task = observer(class Task extends Component {
    constructor(props){
	super(props);
	this.state = {
	    projectName: "",
	    clientId: "",
	    clientName: "",
	    isEdited: false,
	    activeProject: this.props.relatedProject
	};

	// binds
	this.deleteItem = this.deleteItem.bind(this);
	this.editItem = this.editItem.bind(this);
	this.setActiveProject = this.setActiveProject.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async componentWillMount() {
	const getProject = await axios.get("http://localhost:3000/projects/"+this.props.relatedProject);
	const getClient = await axios.get("http://localhost:3000/clients/"+getProject.data.client);

	this.setState({
	    projectName: getProject.data.name,
	    clientId: getProject.data.client,
	    clientName: getClient.data.name
	});
    }

    componentDidUpdate(){
	if(this.state.isEdited){
	    this.setValues();
	}
    }

    async deleteItem(e){
	const req = await deleteTask(this.props.relatedProject, this.props.id); // on attend que la requête soit bien éxécutée, avant d'avertir du changement
	this.props.onChange();
    }
    
    editItem(e){
	this.setState({isEdited: true});
    }
    
    async handleSubmit(e){
	e.preventDefault();
	
	let fd = retrieveFormData(e.target, this.props.store.data.userId);

	// console.log(fd);
	// on lance la requête
	let req = await updateTask(this.state.activeProject, this.props.id, fd);
	this.setState({isEdited: false});
	
	this.props.onChange(); // actualise le trackHistory dans le parent
	
    }
    
    setActiveProject(p){
	this.setState({activeProject: p});	
    }

    setValues(){
	let inputValue = document.getElementById("track-input--value-"+this.props.id);
	let inputComment = document.getElementById("track-input--comment-"+this.props.id);
	let inputTask = document.getElementById("track-input--task-"+this.props.id);
	inputValue.value = this.props.value;
	inputComment.value = this.props.comment;
	inputTask.value = this.props.task;
    }

    render(){
	if(this.state.isEdited){
	    return(
		<li className="list-group-item track-history--item" id={this.props.id}>
		  <form onSubmit={this.handleSubmit}>
		   <label htmlFor="track-input--value">Enter time</label>
		    <input className="form-control form-control-lg w-50"
			   name="value"
			   id={"track-input--value-"+this.props.id}
			   type="text"
			   placeholder="Time"
			   aria-label="Input"
			   data-parse="number"/>
		    <label htmlFor="track-input--task">Task</label>
		    <input className="form-control w-100"
			   name="task"
			   id={"track-input--task-"+this.props.id}
			   type="text"
			   placeholder="Task description"
			   aria-label="Input"/>
		    <label htmlFor="track-input--comment">Comment</label>
		    <textarea className="form-control w-100"
			      name="comment"
			      id={"track-input--comment-"+this.props.id}
			      type="text"
			      placeholder="Write a comment"
			      aria-label="Input"/>
		    <button
		      className="btn btn-primary">Update</button>
		  </form>
		  <ProjectsSelector store={this.props.store} onChange={this.setActiveProject} active={this.state.activeProject}/>
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
		      <a className="dropdown-item" href="#" onClick={this.deleteItem}>Supprimer</a>
		      <a className="dropdown-item" href="#" onClick={this.editItem}>Éditer</a>
		    </div>
		  </div>

		  <div className="row">
		    <div className="col-2 item-value"><div className="item-value--inner">{this.props.value}</div></div>
		    <div className="col-10">
		      {this.props.task}<br/>{this.props.comment}
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
})



export default Task;


 // <div className="row">
 // 		      <div className="col-2 item-value"><div className="item-value--inner"><input type="text" placeholder={this.props.value}/></div></div>
 // 		      <div className="col-10">
 // 			<input className="form-control w-50" name="task" id={"track-input--input-"+this.props.id} type="text" placeholder={this.props.task}  aria-label="Input"/>
 // 			<textarea placeholder={this.props.comment}/>
 // 		      </div>
 // 		    </div>
 // 		    <div className="row">
 // 		      <div className="offset-2 col-5 text-muted">
 // 			<ProjectsSelector defs={this.state.definitions} onChange={this.setActiveProject} active={this.state.activeProject}/>
 // 		      </div>
 // 		      <div className="col-5 text-muted">
 // 			{readableDate(this.props.date)}
 // 		      </div>
 // 		    </div>
