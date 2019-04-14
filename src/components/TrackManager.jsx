import React, { Component } from 'react';
import TrackHistoryItem from "./TrackHistoryItem";
import TrackInput from "./TrackInput";
import App from "../App";

import axios from "axios";
import {getUserName, getProjectName, getClientName} from '../utils/defsConverter';

import "./TrackManager.scss";

class TrackManager extends Component {
    constructor(props){
	super(props);
	this.state = {
	    userId: "5c9b3912f787951b7e8c9d62",
	    trackHistory: [],
	    definitions: {},
	};
	this.handleClick = this.handleClick.bind(this);
	this.handleDropdown = this.handleDropdown.bind(this);
	// this.trackInputAdded = this.trackInputAdded.bind(this);
	this.fetchTrackHistory = this.fetchTrackHistory.bind(this);
    }

    handleClick(data, event){
	this.props.onChange(data);
    }
    
    componentDidMount() {
	// console.log("did it mount ?");
	this.setState({definitions: this.props.defs});
	// console.log(this.props.defs);
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

    handleDropdown(e){

	let projectId = e.target.getAttribute("id");
	this.setState({selectedProject: projectId});
    }


    render() {
	console.log(this.state);
	return (
	    <div className="col-6 track-manager">
	      <div className="card">

		{/* --------- */}
		{/* New track */}
		<TrackInput defs={this.state.definitions} onChange={this.fetchTrackHistory}/>

		{/* ------------- */}
		{/* Track history */}
		<ul className="list-group list-group-flush track-history">
		  {this.state.trackHistory.slice(0).reverse().map(childData => {
		      return <TrackHistoryItem onClick={e => this.handleClick(childData, e)} id={childData.id} task={childData.task} value={childData.value} comment={childData.comment} relatedProject={childData.relatedProject} date={childData.date}/>;
		    })}
		</ul>
	      </div>
	    </div>
	);
    }
}

export default TrackManager;


// .slice(0).reverse().map( etc.) copy le tableau en entrée, le retourne, et map notre fonction avec !
