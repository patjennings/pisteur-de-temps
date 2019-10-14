import React, { Component } from 'react';
import {observer, inject} from "mobx-react";

// import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import "assets/styles/main.scss";

const ParamsManager = inject("mainStore", "authStore")(observer(class ParamsManager extends Component {
    constructor(props){
	super(props);
	this.handleChange = this.handleChange.bind(this);
	this.handleResize = this.handleResize.bind(this);
	this.state = {
	    search: '',
	    height: window.innerHeight - 420
	};
    }
 
    handleResize(){
	this.setState({
	    height: window.innerHeight - 420
	});
    }
    handleChange(e){
	this.setState({
	    search: e.target.value
	});
    }

    render() {
	// console.log(this.state.search);
	console.log("Paramètres chargés");
	return (
	    <div>
	      <div className="params-content pane-content" style={{height: this.state.height+"px"}}>
		<div className="row">
		  
		  <div className="col-5">
		    <p className="mb-0">Unités de temps</p>
		    <p className="text-muted">L'application indique par défaut les temps en heures. Vous pouvez modifier cette option et indiquer les temps en jours.</p>
		  </div>
		  <div className="col-2">
		    <div className="dropdown">
		      <button className="btn btn-light dropdown-toggle" type="button" id="select-unit" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			heures
		      </button>
		      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
			<a className="dropdown-item" href="#">heures</a>
			<a className="dropdown-item" href="#">jours</a>
		      </div>
		    </div>
		  </div>
		</div>
		<div className="row">		  
		  <div className="col-5">
		    <p className="mb-0">Langue</p>
		    <p className="text-muted">La langue utilisée dans l'application</p>
		  </div>
		  <div className="col-2">
		    <div className="dropdown">
		      <button className="btn btn-light dropdown-toggle" type="button" id="select-lang" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			Français
		      </button>
		      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
			<a className="dropdown-item" href="#">Français</a>
			<a className="dropdown-item disabled" href="#">English</a>
		      </div>
		    </div>
		  </div>
		</div>
	      </div>
	    </div>
	);
    }
}));

export default ParamsManager;
