import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PersonalManager from './components/PersonalManager';
import Project from './components/Project';
import Navigation from './components/Navigation';
import MainNavigation from 'sharedComponents/MainNavigation';

import {observer, inject} from "mobx-react";

import "./styles.scss";
import "assets/styles/main.scss";

const Dashboard = inject("mainStore")(observer(class Dashboard extends Component {
    constructor(props){
	super(props);
    }

    render() {
	console.log("Dashboard is rendered");
	
	return (
	    
	    <div className="dashboard">
	      <MainNavigation />
	      
	      {/* Dashboard */}
	      <div id="wrapper" className="container-fluid">
		<div className="row">
		  
		  {this.props.mainStore.isLoading == true ? <p>Wait a minute</p> :
		      <div className="col-md-2">
			    <Navigation key={2}/>
			  </div>
		      }
		  
		  <div id="main" className="col-md-10">
		    <div className="container-fluid">
		      <div className="row">
			<div className="col-12">
			  <ReactCSSTransitionGroup
			    component="div" className="row"
			    transitionName="fade"
			    transitionEnterTimeout={500}
			    transitionLeaveTimeout={300}>
			    {this.props.mainStore.isLoading == true ? <p>Wait a minute</p> :
				<div className="col-md-4">
				      <PersonalManager store={this.props.mainStore} key={0}/>
				    </div>
				}
				{this.props.mainStore.showProject ?
				    <div className="col-md-8">
					  <Project key={1}/>
					</div>
					      :
				    <p>Select a project</p>}
			  </ReactCSSTransitionGroup>
			</div>
		      </div>
		    </div>
		  </div>

		  
		  
		  
		  
		</div>
	      </div>
	      
	    </div>
	);
    }
}))

export default Dashboard;

