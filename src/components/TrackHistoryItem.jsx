import React, { Component } from 'react';
import axios from 'axios';
import "../assets/styles/main.scss";
import "./TrackHistoryItem.scss";
import {readableDate} from "../utils/readableDate";

class TrackHistoryItem extends Component {
    constructor(props){
	super(props);
	this.state = {
	    projectName: "",
	    clientId: "",
	    clientName: ""
	};
    }
    
    async componentDidMount() {

	const getProject = await axios.get("http://localhost:3000/projects/"+this.props.relatedProject);
	const getClient = await axios.get("http://localhost:3000/clients/"+getProject.data.client);

	this.setState({
	    projectName: getProject.data.name,
	    clientId: getProject.data.client,
	    clientName: getClient.data.name
	});

	// Comment lancer deux requêtes, quand la première dépend du résultat de la première
	// https://stackoverflow.com/questions/44182951/axios-chaining-multiple-api-requests
    }
    
    render() {
	return (
		<li className="list-group-item track-history--item" id={this.props.id} onClick={this.props.onClick}>

	      <div className="dropdown item-actions position-absolute">
		<button className="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		  ...
		</button>
		<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
		  <a className="dropdown-item" href="#">Supprimer</a>
		  <a className="dropdown-item" href="#">Éditer</a>
		</div>
	      </div>
	      
	      <div className="row">
		<div className="col-2 item-value"><div className="item-value--inner">{this.props.value}</div></div>
		<div className="col-10">
		  <h3>{this.props.task}</h3>
		  <p className="text-muted">{this.props.comment}</p>
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

export default TrackHistoryItem;
