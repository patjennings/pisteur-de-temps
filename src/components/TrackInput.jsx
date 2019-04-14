import React, { Component } from 'react';
// import App from "../App";
import axios from "axios";
import {getUserName, getProjectName, getClientName} from '../utils/defsConverter';

import "./TrackInput.scss";

// des méthodes pour parser ce qui vient des formulaires
const inputParsers = {
    date(input) {
	const [month, day, year] = input.split('/');
	return `${year}-${month}-${day}`;
    },
    uppercase(input) {
	return input.toUpperCase();
    },
    number(input) {
	return parseFloat(input+" zerzer");
    },
};

class TrackInput extends Component {
    constructor(props){
	super(props);
	this.state = {
	    userId: "5c9b3912f787951b7e8c9d62",
	    selectedProject: null,
	    definitions: {},
	};
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    componentWillMount() {

	this.setState({definitions: this.props.defs});
	
    }
    shouldComponentUpdate(nextProps, nextState){
	if(nextProps.defs === nextState.definitions){
	    return true;
	}
	else {
	    this.setState({definitions: nextProps.defs});
	    return false;
	}
    }


    handleSubmit(e){
	e.preventDefault();

	const form = e.target;
	const data = new FormData(form);

	let req = {};
	
	for (let name of data.keys()) {
	    const input = form.elements[name];
	    const parserName = input.dataset.parse;
	    
	    if(parserName){
		const parser = inputParsers[parserName];
		const parsedValue = parser(data.get(name));
		req.value = parsedValue;
		// data.set(name, parsedValue);
	    }
	    else{
		req[name] = data.get(name);
	    }

	}
	req.user = this.state.userId;

	if(isNaN(req.value)){
	    console.log("Renseignez un temps passé");
	}else if (req.client === null){
	    console.log("Vous devez sélectionner un projet");
	}else if (req.task === ""){
	     console.log("Entrez une tâche");
	}
	else{
	    axios
	    	.post("http://localhost:3000/projects/"+this.state.selectedProject+"/trackedtime", {
		    task: req.task,
		    comment: req.comment,
		    value: req.value,
		    user: this.state.userId
		})
	    	.then(res => {
		    console.log(res);
		    this.props.onChange(); // on appelle la fonction chez le parent, qui avertit du changement
	    	})
		.catch(error => {
		    console.log(error);
		})
	}
	// data.set("client", this.state.selectedProject);
	// console.log(stringifyFormData(data));
    }
    
    handleDropdownChange(e){
	e.preventDefault();

	let projectId; // get the id
	if(e.target.nodeName === "SPAN"){ // handle case where child is clicked
	    projectId = e.target.parentNode.getAttribute("id");
	} else {
	    projectId = e.target.getAttribute("id");
	}
	this.setState({selectedProject: projectId});
    }


    render() {
	return (
	    <div className="card-header track-input">
	      <form onSubmit={this.handleSubmit}>
		<div className="row">
		  <div className="col">
		    <label htmlFor="track-input--value">Enter time</label>
		    <input className="form-control form-control-lg w-50"
			   name="value"
			   id="track-input--input"
			   type="text"
			   placeholder="Time"
			   aria-label="Input"
			   data-parse="number"/>
		    <label htmlFor="track-input--task">Task</label>
		    <input className="form-control w-100"
			   name="task"
			   id="track-input--input"
			   type="text"
			   placeholder="Task description"
			   aria-label="Input"/>
		    <label htmlFor="track-input--comment">Comment</label>
		    <textarea className="form-control w-100"
			   name="comment"
			   id="track-input--comment"
			   type="text"
			   placeholder="Write a comment"
			   aria-label="Input"/>
		    
		    <button
		      className="btn btn-primary">Submit</button>
		  </div>
		  <div className="col">
		    <div className="dropdown">
		      <button
			className="dropdown-toggle btn"
			data-toggle="dropdown"
			aria-haspopup="true"
			aria-expanded="false">
			{this.state.selectedProject == null ? "Select a project" : getProjectName(this.state.definitions, this.state.selectedProject)}
		      </button>
		      
		      
		      <div className="dropdown-menu"
			   aria-labelledby="dropdownMenuButton">
			{Object.keys(this.state.definitions).length !== 0 &&
			    this.state.definitions.projectsDefinitions.map(p => {
				return  <a className="dropdown-item" href="#" key={p._id} id={p._id} onClick={this.handleDropdownChange}>{p.name}<span className="text-muted small">{p.client}</span></a>;
			    })
			}
		      </div>
		    </div>

		  </div>
		</div>
	      </form>
	    </div>

	);
    }
}

function stringifyFormData(fd) {
    const data = {};
    fd.forEach((value, key) => {data[key] = value});
    return JSON.stringify(data);
}

export default TrackInput;
