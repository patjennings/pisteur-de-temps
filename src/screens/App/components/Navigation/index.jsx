import React, { Component } from 'react';
import axios from "axios";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';
import ListClientProjects from "./components/ListClientProjects";

import "./styles.scss";

class Navigation extends Component {
    constructor(props){
	super(props);
	this.state = {
	    definitions: {}
	};
	this.handleChange= this.handleChange.bind(this);
	
    }
    componentWillMount(){
    	this.setState({
    	    definitions: this.props.defs
    	});
    }
    handleChange(data, event){
	this.props.onChange(data._id);
    }
    render() {
	console.log(this.state.definitions);
	return (
	    <div className="row">
	      <div className="col-12">
		<input className="form-control form-control-dark w-100 mb-3" type="text" placeholder="Search" aria-label="Search"/>
		{this.state.definitions.clientsDefinitions.map(c => {
		    return (
			<ListClientProjects name={c.name} id={c._id} defs={this.state.definitions} onChange={this.handleChange}/>
		    );
		})}

		<div className="footer">
		<button className="btn btn-primary" type="button">Ajouter un client</button>
		</div>
		</div>
		</div>
	);
    }
}

export default Navigation;
