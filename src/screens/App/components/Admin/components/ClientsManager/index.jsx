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
	      <button className="btn btn-primary" type="button" onClick={this.addClient}>Add a client</button>
	       { this.state.isAddingClient ? <AddClient onChange={this.handleChange} /> : null }
	      <ul>
		{this.props.mainStore.clientsDefinitions.map(c => <li><Client key={c._id} clientid={c._id}/></li>)}

	      </ul>
	    </div>
	);
    }
}));

export default ClientsManager;
