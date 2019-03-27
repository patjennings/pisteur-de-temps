import React, { Component } from 'react';
import ProjectList from './components/project-list'

import axios from 'axios'; // fetch data from API

class App extends Component {
    state = {
	projects: []
    }
    componentDidMount() {
	axios
	    .get("http://localhost:3000/projects")
	    .then(response => {

		// create an array of contacts only with relevant data
		const newProjects = response.data.map(c => {
		    return {
			id: c._id,
			name: c.name
		    };
		});

		// create a new "State" object without mutating 
		// the original State object. 
		const newState = Object.assign({}, this.state, {
		    projects: newProjects
		});

		// store the new state object in the component's state
		this.setState(newState);
		// console.log(this.state);
	    })
	    .catch(error => console.log(error));
    }
    render() {
	return (
	    <ProjectList projects={this.state.projects} />
	);
    }
}

export default App;
