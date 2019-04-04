import React, { Component } from 'react';
import ProjectList from './components/project-list';
import TimePusher from './components/time-pusher';
import ProjectSelector from './components/project-selector';

import axios from 'axios'; // fetch data from API

class App extends Component {
    constructor(props){
	super(props);
	this.state = {
	    projects: [],
	    clients: []
	};
    }
    
    componentDidMount() {
	axios
	    .get("http://localhost:3000/projects")
	    .then(response => {

		// create an array of projects, only with relevant data
		const fetchedProjects = response.data.map(p => {
		    return {
			id: p._id,
			name: p.name
		    };
		});

		// create a new "State" object without mutating 
		// the original State object. 
		const newState = Object.assign({}, this.state, {
		    projects: fetchedProjects
		});

		// store the new state object in the component's state
		this.setState(newState);
	    })
	    .catch(error => console.log(error));

    }
    render() {
	return (
	    <div>
		<ProjectList projects={this.state.projects} />
		<TimePusher />
		<ProjectSelector />
	    </div>
	);
    }
}

export default App;
