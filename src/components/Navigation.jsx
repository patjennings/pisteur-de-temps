import React, { Component } from 'react';
import axios from "axios";
import {getUserName, getProjectName, getClientName} from '../utils/defsConverter';

import "./Navigation.scss";

class Navigation extends Component {
    constructor(props){
	super(props);
	
    }
    render() {
	return (
	    <div className="row">
	      <div className="col-12">
		<input className="form-control form-control-dark w-100 mb-3" type="text" placeholder="Search" aria-label="Search"/>
		<h5 className="client-name d-flex justify-content-between align-items-center ">
		  <span> Client</span>
		  <a className="project-add d-flex align-items-center" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Add a project"><i className="ico">plus_circle</i></a>
		</h5>
		<ul>
		  <li><a href="#">Project</a></li>
		  <li><a href="#">Project</a></li>
		  <li><a href="#">Project</a></li>
		</ul>
		<div className="footer">
		  <button className="btn btn-primary" type="button">Ajouter un client</button>
		</div>
	      </div>
	    </div>
	);
    }
}

export default Navigation;
