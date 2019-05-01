import React, { Component } from 'react';
import axios from "axios";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';
import ListClientProjects from "./components/ListClientProjects";
import AddClient from './components/AddClient';

import "./styles.scss";

class Navigation extends Component {
    constructor(props){
	super(props);
	this.state = {
	    definitions: this.props.defs
	};
	this.handleChange= this.handleChange.bind(this);
	this.handleClick= this.handleClick.bind(this);
    }
    handleChange(data, event){
	this.props.onChange(data._id);
    }
    handleClick(data, event){
	console.log(data);
    }
    render() {
	return (
	    <div className="row">
	      <div className="col-12">
		<input className="form-control form-control-dark w-100 mb-3" type="text" placeholder="Search" aria-label="Search"/>
		{this.state.definitions.clientsDefinitions.map(c => {
		    return (
			<ListClientProjects key={c._id} name={c.name} id={c._id} defs={this.state.definitions} onChange={this.handleChange}/>
		    );
		})}
		<AddClient isVisible="false" defs={this.state.definitions} />
		<div className="footer">
		<button className="btn btn-primary" type="button" onClick={this.handleClick}>Ajouter un client</button>
		</div>
		</div>
		</div>
	);
    }
}

export default Navigation;
