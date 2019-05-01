import React, { Component } from 'react';
// import Definitions from 'utils/definitions';

import PersonalManager from './components/PersonalManager';
import Project from './components/Project';
import Navigation from './components/Navigation';

// import {observable, action, decorate} from "mobx";
import {observer, inject} from "mobx-react";

// import Store from "store/Store";


// import {hot} from "react-hot-loader";

import "./styles.scss";
import "assets/styles/main.scss";

// let store = new Store();
// store.getDefs();

const App = inject("mainStore")(observer(class App extends Component {
    constructor(props){
	super(props);
	// console.log(this.props.mainStore);
	// this.state = {
	//     userId: "5c9b3912f787951b7e8c9d62",
	//     showProject: false,
	//     activeProject: null,
	//     definitions: {}
	// };

	// console.log(this.props.mainStore.getClients);
	

	this.handleChange = this.handleChange.bind(this);
	// this.setDefinitions = this.setDefinitions.bind(this);
	// this.setDefinitions();

    }
    componentDidMount(){
	this.props.mainStore.loadDefinitions();
    }

    handleChange(d){

    }
 
    render() {
	// console.log(this.props.mainStore.isLoading)
	// console.log(this.props.mainStore.clientsDefinitions);
	// console.log(Object.keys(this.state.definitions).length === 0);
	return (
	    <div id="wrapper" className="container-fluid">
	      <div className="row">
		<div id="main" className="col-9">
		  <div className="row">
	
			    	    {this.props.mainStore.isLoading == true ?
			<p>Wait a minute</p> :
			    <PersonalManager store={this.props.mainStore} />
			     }
		    {/* On vérifie d'abord qu'il y a qqchose dans state.definitions*/}

			{/*    {store.data.showProject ?  <Project
							     store={store}
							 /> : <p>Select a project</p>}	       */}	
		  </div>
		</div>
		<div id="nav" className="col-3">
		 {/* {Object.keys(store.data.definitions).length === 0 ? <p>Wait a minute</p> : <Navigation
												   store={store}
												  />} */}
		</div>
	      </div>
	    </div>
	);
    }
}))

// export default hot(module)(App);
export default App;

// <Navigation defs={this.state.definitions}/>
