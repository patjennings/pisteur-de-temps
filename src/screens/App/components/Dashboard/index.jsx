import React, { Component } from 'react';

import PersonalManager from './components/PersonalManager';
import Project from './components/Project';
import Navigation from './components/Navigation';

import {observer, inject} from "mobx-react";

import "./styles.scss";
import "assets/styles/main.scss";

const Dashboard = inject("mainStore")(observer(class Dashboard extends Component {
    constructor(props){
	super(props);
    }

    render() {
	// console.log("Dashboard is rendered");
	return (
	    <div className="dashboard">
	      {/* Dashboard */}
	      <div id="wrapper" className="container-fluid">
		<div className="row">
		  <div id="main" className="col-9">
		    <div className="row">
		      
		      {this.props.mainStore.isLoading == true ?
			  <p>Wait a minute</p> :
			      <PersonalManager store={this.props.mainStore} />
			      }

			      {this.props.mainStore.showProject ?  <Project /> : <p>Select a project</p>}	       	
		    </div>
		  </div>
		  <div id="nav" className="col-3">
		    {this.props.mainStore.isLoading == true ? <p>Wait a minute</p> : <Navigation />}
		  </div>
		</div>
	      </div>
	      
	    </div>
	);
    }
}))

export default Dashboard;

