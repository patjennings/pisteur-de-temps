import React, { Component } from 'react';
// import MainView from './views/MainView';
// import NavView from './views/NavView';

import clientDefinitions from './utils/clientDefinitions';
// import userDefinitions from './utils/userDefinitions'
// import projectDefinitions from './utils/projectDefinitions'

import TrackManager from './components/TrackManager';
import ProjectDetails from './components/ProjectDetails';

let cd = new clientDefinitions();

class App extends Component {
    constructor(props){
	super(props);
	this.state = {
	    projects: [],
	    clients: [],
	    displayedProject: null,
	    definitions: {}
	};
	this.handleChange = this.handleChange.bind(this);

	cd.getDefinitions().then(value =>{
	    this.setState({definitions: value});
	});
    }
    handleChange(d){
	this.setState({displayedProject: d.relatedProject});
    }
    
    componentDidUpdate() {
	// console.log(this.state.displayedProject);
    }
    render() {
	// console.log("App.js > "+this.state.displayedProject);
	return (
	    <div className="row">
	      <div id="main" className="col-9">
		<div className="row">
		  <div className="col-6 track-manager">
		    <TrackManager onChange={this.handleChange} />
		  </div>
		  <div className="col-6 project-details">
		<ProjectDetails project={this.state.displayedProject} defs={this.state.definitions}/>
		  </div>
		</div>
	      </div>
	    </div>
	);
    }
}

export default App;
