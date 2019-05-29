import React, { Component } from 'react';
import {observer, inject} from "mobx-react";
import AddClient from "../AddClient";
import Client from "./components/Client";

import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import "./styles.scss";
import "assets/styles/main.scss";

const ClientsManager = inject("mainStore", "authStore")(observer(class ClientsManager extends Component {
    constructor(props){
	super(props);
	this.state = {
	    isAddingClient: false
	};
	this.addClient = this.addClient.bind(this);
	this.handleChange = this.handleChange.bind(this);
	this.changeOrder = this.changeOrder.bind(this);
    }
    changeOrder(){
	console.log("sort !");
    }

    addClient(){
	this.setState({isAddingClient: true});
    }

    handleChange(e){
	console.log("reset navigation");
	this.setState({isAddingClient: false});
    }
    
    render() {
	return (
	     <div>
	      <div className="projects-header pane-header">
		<div className="actions">
		  
		  <div className="row">
		      <div className="col-4">
			<input className="form-control"
  			       name="search"
  			       id={"user-input--name"}
  			       type="text"
  			       aria-label="Input"
			       placeholder="Search"/>
		      </div>
		      <div className="col-5">
			<div className="btn-group">
			  <button type="button" className="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			    Filter
			  </button>
			  <div className="dropdown-menu">
			    <a className="dropdown-item" href="#" onClick={this.changeOrder} sort="name">Name</a>
			    <a className="dropdown-item" href="#" onClick={this.changeOrder} sort="date">Date added</a>
			    <a className="dropdown-item" href="#" onClick={this.changeOrder} sort="role">Role</a>
			  </div>
			</div>
		      </div>
		    <div className="col-3">
		      <button className="btn btn-primary float-right" type="button" onClick={this.addClient}><i className="ico">plus</i>&nbsp;Add a client</button>
		      </div>
		    </div>
		    
		  
		 
		</div>
		<div className="column-name">
		  <div className="row">
		    <div className="col-12">
		      Client
		    </div>
		  </div>
		</div>
	      </div>
	      <div className="projects-content pane-content">
		<ul>
		  { this.state.isAddingClient ? <li className="new"><AddClient onChange={this.handleChange} /></li> : null }
		  {this.props.mainStore.clientsDefinitions.map(c => <Client key={c._id} clientid={c._id}/>)}
                </ul>
	      </div>
            </div>

	    
	
	);
    }
}));

export default ClientsManager;
