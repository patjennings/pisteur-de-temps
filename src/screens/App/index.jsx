import React, { Component } from 'react';
import Definitions from 'utils/definitions';

import PersonalManager from './components/PersonalManager';
import Project from './components/Project';
import Navigation from './components/Navigation';
import {hot} from "react-hot-loader";

import "./styles.scss";
import "assets/styles/main.scss";

let def = new Definitions();

class App extends Component {
    constructor(props){
	super(props);
	this.state = {
	    userId: "5c9b3912f787951b7e8c9d62",
	    projects: [],
	    clients: [],
	    showDetails: false,
	    activeProject: null,
	    definitions: {}
	};
	this.handleChange = this.handleChange.bind(this);

	// On récupère les définitions une fois qu'elles sont chargées, et on fait un setState, ça rend à nouveau
	def.getDefinitions()
	    .then(value =>{
		this.setState({definitions: value});
	    })
	    .catch(error => {
		console.log(error);
	    });
    }
    handleChange(d){
	// console.log("activeProject");
	// console.log(d);
	
	this.setState({
	    activeProject: d,
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
	// console.log(Object.keys(this.state.definitions).length === 0);
	return (
	    <div id="wrapper" className="container-fluid">
	      <div className="row">
		<div id="main" className="col-9">
		  <div className="row">

		    {Object.keys(this.state.definitions).length === 0 ? <p>Wait a minute</p> : <PersonalManager onChange={this.handleChange} defs={this.state.definitions} user={this.state.userId}/>}
		    {/* On vérifie d'abord qu'il y a qqchose dans state.definitions*/}

		      {this.state.showDetails ?  <Project key={this.state.activeProject} projectid={this.state.activeProject} defs={this.state.definitions}/> : <p>Select a project</p>}	      
		  </div>
		</div>
		<div id="nav" className="col-3">
		  {Object.keys(this.state.definitions).length === 0 ? <p>Wait a minute</p> : <Navigation defs={this.state.definitions} onChange={this.handleChange}/>}
		</div>
	      </div>
	    </div>
	);
    }
}

// export default hot(module)(App);
export default App;

// <Navigation defs={this.state.definitions}/>
