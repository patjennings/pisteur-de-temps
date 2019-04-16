import React, { Component } from 'react';
import axios from 'axios';
import "assets/styles/main.scss";
import "./styles.scss";
import {readableDate} from "utils/readableDate";
import deleteTask from "utils/deleteTask";

class Task extends Component {
    constructor(props){
	super(props);
	this.state = {
	    userId: null,
	    projectName: "",
	    clientId: "",
	    clientName: "",
	    isEdited: false
	};

	this.deleteItem = this.deleteItem.bind(this);
	this.editItem = this.editItem.bind(this);
	EditDropdown = EditDropdown.bind(this);
    }
    
    async componentWillMount() {

	const getProject = await axios.get("http://localhost:3000/projects/"+this.props.relatedProject);
	const getClient = await axios.get("http://localhost:3000/clients/"+getProject.data.client);

	this.setState({
	    userId: this.props.user,
	    projectName: getProject.data.name,
	    clientId: getProject.data.client,
	    clientName: getClient.data.name
	});

	// Comment lancer deux requêtes, quand la première dépend du résultat de la première
	// https://stackoverflow.com/questions/44182951/axios-chaining-multiple-api-requests
    }

    async deleteItem(e){
	const req = await deleteTask(this.props.relatedProject, this.props.id); // on attend que la requête soit bien éxécutée, avant d'avertir du changement
	this.props.onChange();
    }
    editItem(e){
	this.setState({isEdited: true});
    }
    
    render() {
	return (
	    <li className="list-group-item track-history--item" id={this.props.id} onClick={this.props.onClick}>
	      {this.state.isEdited ? null : <EditDropdown/>}

	      <div className="row">
		<div className="col-2 item-value"><div className="item-value--inner">{this.props.value}</div></div>
		<div className="col-10">
		  {this.state.isEdited ?
		      <input className="form-control w-50" name="task" id="track-input--input" type="text" placeholder={this.props.task}  aria-label="Input"/>
			  : <h5>{this.props.task}</h5>
		      }
		      {this.state.isEdited ? 
			  <textarea placeholder={this.props.comment}/>
			      : <p className="text-muted">{this.props.comment}</p>
			  }
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

function EditDropdown(props){
    return(
	<div className="dropdown item-actions position-absolute">
	  <button className="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	    <i className="ico ico-dots_v">dots_v</i>
	  </button>
	  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
	    <a className="dropdown-item" href="#" onClick={this.deleteItem}>Supprimer</a>
	    <a className="dropdown-item" href="#" onClick={this.editItem}>Éditer</a>
	  </div>
	</div>
    );
}


export default Task;
