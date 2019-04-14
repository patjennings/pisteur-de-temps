import React, { Component } from 'react';
import TrackManager from '../components/TrackManager';
import ProjectDetails from '../components/ProjectDetails';

class MainView extends Component {
    constructor(props){
	super(props);
	this.state = {
	    projects: [],
	    clients: []
	};
    }
    
    componentDidMount() {

    }
    componentDidUpdate(){
	console.log("Update !");
    }
    render() {
	return (
	    <div id="main" className="col-9">
	      <div className="row">
		<TrackManager />
		<ProjectDetails />
	      </div>
	    </div>
	);
    }
}

export default MainView;
