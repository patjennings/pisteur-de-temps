import React, { Component } from 'react';
// import MainView from './views/MainView';
// import NavView from './views/NavView';

import Definitions from './utils/Definitions';

import TrackManager from './components/TrackManager';
import ProjectDetails from './components/ProjectDetails';

let defs = new Definitions();

class App extends Component {
    constructor(props){
	super(props);
	this.state = {
	    projects: [],
	    clients: [],
	    showDetails: false,
	    displayedProject: null,
	    definitions: {}
	};
	this.handleChange = this.handleChange.bind(this);

	defs.getDefinitions().then(value =>{
	    this.setState({definitions: value});
	});
    }
    handleChange(d){
	this.setState({
	    displayedProject: d.relatedProject,
	    showDetails: true
	});
    }
    componentWillUpdate(){
	// console.log("will update");
    }
    componentDidUpdate() {
	// console.log("did update");
    }
 
    render() {
	// console.log(Object.keys(this.state.definitions).length !== 0);
	return (
	    <div className="row">
	      <div id="main" className="col-9">
		<div className="row">
		  <div className="col-6 track-manager">
		    {Object.keys(this.state.definitions).length !== 0 ? <TrackManager onChange={this.handleChange} defs={this.state.definitions}/> : <p>Wait a minute</p>}
		  </div>
		  <div className="col-6 project-details">
		    {this.state.showDetails ?  <ProjectDetails project={this.state.displayedProject} defs={this.state.definitions}/> : <p>Select a project</p>}
		   
		  </div>
		</div>
	      </div>
	    </div>
	);
    }
}

export default App;
