import React, { Component } from 'react';
import axios from "axios";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';
import ListClientProjects from "./components/ListClientProjects";
import AddClient from './components/AddClient';

import {toJS} from "mobx";
import {inject, observer} from "mobx-react";


import "./styles.scss";

const Navigation = inject("mainStore")(observer(class Navigation extends Component {
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
	    <div className="row">
	      <div className="col-12">
		<input className="form-control form-control-dark w-100 mb-3" type="text" placeholder="Search" aria-label="Search"/>
		{this.props.mainStore.clientsDefinitions.map(c => {
		    return (
			<ListClientProjects key={c._id} name={c.name} id={c._id}/>
		    );
		})}
	    { this.state.isAddingClient ? <AddClient onChange={this.handleChange} /> : null }
	    
		<div className="footer">
		<button className="btn btn-primary" type="button" onClick={this.addClient}>Ajouter un client</button>
		</div>
		</div>
		</div>
	);
    }
}));

export default Navigation;
