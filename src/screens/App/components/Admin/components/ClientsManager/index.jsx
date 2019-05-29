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
		  <button className="btn btn-primary" type="button" onClick={this.addClient}>Add a client</button>
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
