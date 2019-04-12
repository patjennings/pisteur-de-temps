import React, { Component } from 'react';
import TrackHistoryItem from "./TrackHistoryItem";
import App from "../App";
import axios from "axios";

class TrackManager extends Component {
    constructor(props){
	super(props);
	this.state = {
	    userId: "5c9b3912f787951b7e8c9d62",
	    trackHistory: []
	};
	this.handleClick = this.handleClick.bind(this);
    }

    handleClick(data, event){
	// console.log(data);
	this.props.onChange(data);
    }
    
    componentDidMount() {
	axios
	    .get("http://localhost:3000/users/"+this.state.userId+"/trackedTime")
	    .then(response => {
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
		const newState = Object.assign({}, this.state, {
		    trackHistory: fetchedHistory
		});
		this.setState(newState);
	    })
	    .catch(error => console.log(error));
    }
    
    render() {
	return (

	      <div className="card">

		{/* --------- */}
		{/* New track */}
		<div className="card-header track-new">
		  <div className="row">
		    <div className="col">
		      <label for="track-new--input">Enter time</label>
		      <input className="form-control form-control-lg w-50" id="track-new--input" type="text" placeholder="Time" aria-label="Search" />
		    </div>
		    <div className="col">
		      <div className="dropdown">
			<button className="dropdown-toggle btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			  Avionics 2020 <span className="text-muted small">&nbsp;&nbsp;Thales</span>
			</button>
			<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
			  <a className="dropdown-item" href="#">
			    <p>Project</p>
			    <p className="text-muted">Client</p>
			  </a>
			  <a className="dropdown-item" href="#">
			    <p>Project</p>
			    <p className="text-muted">Client</p>
			  </a>
			  <a className="dropdown-item" href="#">
			    <p>Project</p>
			    <p className="text-muted">Client</p>
			  </a>
			</div>
		      </div>

		    </div>
		  </div>
		</div>

		{/* ------------- */}
		{/* Track history */}
		<ul className="list-group list-group-flush track-history">
		    {this.state.trackHistory.map(childData => {
			return <TrackHistoryItem onClick={e => this.handleClick(childData, e)} id={childData.id} task={childData.task} value={childData.value} comment={childData.comment} relatedProject={childData.relatedProject} date={childData.date}/>;
		      })}
		  </ul>
	      </div>
	);
    }
}

export default TrackManager;
