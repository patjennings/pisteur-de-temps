import React, { Component } from 'react';
// import Definitions from 'utils/definitions';

import PersonalManager from './components/PersonalManager';
import Project from './components/Project';
import Navigation from './components/Navigation';

import {observer, inject} from "mobx-react";

import "./styles.scss";
import "assets/styles/main.scss";

const App = inject("mainStore")(observer(class App extends Component {
    constructor(props){
	super(props);
	this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
	// this.props.mainStore.loadDefinitions();
	// this.props.mainStore.loadPersonalHistory();
    }

    handleChange(d){

    }
    
    render() {
	// console.log("App is rendered");
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
