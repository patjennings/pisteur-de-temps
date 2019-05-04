import React, { Component } from 'react';
// import Definitions from 'utils/definitions';

import Login from './components/Login';
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import Synthesis from './components/Synthesis';
import Admin from './components/Admin';

import {observer, inject} from "mobx-react";

import "./styles.scss";
import "assets/styles/main.scss";

const App = inject("mainStore")(observer(class App extends Component {
    constructor(props){
	super(props);
    }

    render() {
	// console.log("App is rendered");
	
	return (
	    <div className="app">

	      {!this.props.mainStore.isLoggedIn ? <Login /> : null }
	      {this.props.mainStore.isLoggedIn ? <Nav /> : null }
	      {this.props.mainStore.isLoggedIn && this.props.mainStore.pageDisplayed === "dashboard" ? <Dashboard /> : null }
	      {this.props.mainStore.isLoggedIn && this.props.mainStore.pageDisplayed === "synthesis" ? <Synthesis /> : null }
	      {this.props.mainStore.isLoggedIn && this.props.mainStore.pageDisplayed === "admin" ? <Admin /> : null }
	  
	      
	    </div>
	);
    }
}))

// export default hot(module)(App);
export default App;

// <Navigation defs={this.state.definitions}/>
