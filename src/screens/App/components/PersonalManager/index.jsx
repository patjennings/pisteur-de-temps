import React, { Component } from 'react';
import Task from "./components/Task";
import TaskInput from "./components/TaskInput";

import axios from "axios";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import "./styles.scss";

class PersonalManager extends Component {
    constructor(props){
	super(props);
	this.state = {
	    userId: null,
	    trackHistory: [],
	    definitions: {},
	};
	this.handleClick = this.handleClick.bind(this);
	this.handleChange = this.handleChange.bind(this);
	this.handleDropdown = this.handleDropdown.bind(this);
	// this.trackInputAdded = this.trackInputAdded.bind(this);
	this.fetchTrackHistory = this.fetchTrackHistory.bind(this);
    }
    
    componentWillMount() {
	// console.log("did it mount ?");
	this.setState({
	    userId: this.props.user,
	    definitions: this.props.defs
	});
    }
    componentDidMount(){
	this.fetchTrackHistory();
    }

    fetchTrackHistory(){
	axios
	    .get("http://localhost:3000/users/"+this.state.userId+"/trackedTime")
	    .then(response => {
		// je remplis un objet pour chaque réponse de la requête...
		const fetchedHistory = response.data.message.map(t => {
		    return {
			id: t._id,
			task: t.task,
			value: t.value,
			comment: t.comment,
			relatedProject: t.relatedProject,
			date: t.dateCreation
		    };
		});
		// ... et j'ajoute ensuite chacun au tableau trackHistory[]
		const newState = Object.assign({}, this.state, {
		    trackHistory: fetchedHistory
		});
		this.setState(newState);
	    })
	    .catch(error => console.log(error));
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

    handleClick(data, event){
	this.props.onChange(data.relatedProject);
    }

    handleChange(data, event){
	this.props.onChange(data.relatedProject);
	this.fetchTrackHistory();
    }

    handleDropdown(e){
	let projectId = e.target.getAttribute("id");
	this.setState({selectedProject: projectId});
    }


    render() {
	console.log(this.state.definitions);
	return (
	    <div className="col-6 track-manager">
	      <div className="card">

		{/* --------- */}
		{/* New track */}
		<TaskInput defs={this.state.definitions} user={this.state.userId} onChange={this.fetchTrackHistory}/>

		{/* ------------- */}
		{/* Track history */}
		<ul className="list-group list-group-flush track-history">
		  {this.state.trackHistory.slice(0).reverse().map(childData => {
		      return <Task onClick={e => this.handleClick(childData, e)} id={childData.id} task={childData.task} value={childData.value} comment={childData.comment} relatedProject={childData.relatedProject} date={childData.date} user={this.state.userId}  onChange={e => this.handleChange(childData, e)}/>;
		    })}
		</ul>
	      </div>
	    </div>
	);
    }
}

export default PersonalManager;


// .slice(0).reverse().map( etc.) copy le tableau en entrée, le retourne, et map notre fonction avec !
