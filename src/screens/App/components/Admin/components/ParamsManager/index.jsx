import React, { Component } from 'react';
import {observer, inject} from "mobx-react";

// import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import "assets/styles/main.scss";

const ParamsManager = inject("mainStore", "authStore")(observer(class ParamsManager extends Component {
    constructor(props){
	super(props);
	this.handleChange = this.handleChange.bind(this);
	this.handleResize = this.handleResize.bind(this);
	this.handleDropdownChange = this.handleDropdownChange.bind(this);
	this.state = {
	    search: '',
	    height: window.innerHeight - 420,
	    unit: this.props.mainStore.unit,
	    lang: this.props.mainStore.lang
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
    handleDropdownChange(e){
	e.preventDefault();
	this.props.mainStore.updateParameters("unit", "day");

	const paramKey = e.currentTarget.parentNode.parentNode.getAttribute("id");
	const paramValue = e.currentTarget.getAttribute("id");

	// console.log(paramKey+" : "+paramValue);
	this.props.mainStore.updateParameters(paramKey, paramValue);
    }

    render() {
	// console.log(this.state.search);
	// console.log("Paramètres chargés");
	return (
	    <div>
	      <div className="params-content pane-content" style={{height: this.state.height+"px"}}>
		<div className="row">
		  
		  <div className="col-5">
		    <p className="mb-0">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.params.unit.name}</p>
		    <p className="text-muted">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.params.unit.description}</p>
		  </div>
		  <div className="col-2">
		    <div className="dropdown" id="unit">
		      <button className="btn btn-light dropdown-toggle" type="button" id="select-unit" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			{this.props.mainStore.unit == "hour" ? this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.params.unit.select.hour : this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.params.unit.select.day}
		      </button>
		      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
			<a className="dropdown-item" href="#" onClick={this.handleDropdownChange} id="hour">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.params.unit.select.hour}</a>
			<a className="dropdown-item" href="#" onClick={this.handleDropdownChange} id="day" >{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.params.unit.select.day}</a>
		      </div>
		    </div>
		  </div>
		</div>
		<div className="row">		  
		  <div className="col-5">
		    <p className="mb-0">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.params.lang.name}</p>
		    <p className="text-muted">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.params.lang.description}</p>
		  </div>
		  <div className="col-2">
		    <div className="dropdown" id="lang">
		      <button className="btn btn-light dropdown-toggle" type="button" id="select-lang" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			{this.props.mainStore.lang == "fr" ? this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.params.lang.select.fr : this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.params.lang.select.en }
		      </button>
		      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
			<a className="dropdown-item" href="#" onClick={this.handleDropdownChange} id="fr">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.params.lang.select.fr}</a>
			<a className="dropdown-item" href="#" onClick={this.handleDropdownChange} id="en">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.params.lang.select.en}</a>
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
