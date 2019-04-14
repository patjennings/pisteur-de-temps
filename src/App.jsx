import React, { Component } from 'react';
import Definitions from './utils/Definitions';

import TrackManager from './components/TrackManager';
import ProjectDetails from './components/ProjectDetails';
import Navigation from './components/Navigation';
import {hot} from "react-hot-loader";

import "./App.scss";
import "./assets/styles/main.scss";

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
	    <div id="wrapper" className="container-fluid">
	      <div className="row">
		<div id="main" className="col-9">
		  <div className="row">

		      {Object.keys(this.state.definitions).length !== 0 ? <TrackManager onChange={this.handleChange} defs={this.state.definitions}/> : <p>Wait a minute</p>}

		      {this.state.showDetails ?  <ProjectDetails project={this.state.displayedProject} defs={this.state.definitions}/> : <p>Select a project</p>}
		      
		  </div>
		</div>
		<div id="nav" className="col-3">
		  <Navigation/>
		</div>
	      </div>
	    </div>
	);
    }
}

export default hot(module)(App);
// export default App;
