import React, { Component } from 'react';

import {observer, inject} from "mobx-react";

import "./styles.scss";
import "assets/styles/main.scss";

const MainNavigation = inject("mainStore", "authStore", "routingStore")(observer(class MainNavigation extends Component {
    constructor(props){
	super(props);
	this.navigate = this.navigate.bind(this);
    }

    navigate(e){
	// console.log(e.currentTarget.name);
	const dest = e.currentTarget.name;
	this.props.mainStore.setPageDisplayed(dest);
    }

    render() {
	const { location, push, goBack } = this.props.routingStore;
        
	// console.log("MainNavigation is rendered");
	return (
	      <header className="" id="main-navigation">

		{/*<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		  <span className="navbar-toggler-icon"></span>
		</button>*/}

		

		  <ul className="main-nav justify-content-center">
		    <li className="main-nav-item">
		      <a className="main-nav-link" onClick={() => push('/overview')} name="dashboard">Dashboard <span className="sr-only">(current)</span></a>
		    </li>
		    <li className="main-nav-item">
		      <a className="main-nav-link" onClick={() => push('/synthesis')} name="synthesis">Synthesis <span className="sr-only">(current)</span></a>
		    </li>
		  </ul>

		  
		  <div className="dropdown admin">
		    <button className="btn btn-secondary dropdown-toggle" type="button" id="adminMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		      <small>Connected as </small>{this.props.authStore.user.firstName}
		    </button>
		    <div className="dropdown-menu" aria-labelledby="adminMenuButton">
		      <a className="dropdown-item" onClick={() => push('/admin')}>Admin</a>
		      <div className="dropdown-divider"></div>
		      <a className="dropdown-item" onClick={() => this.props.authStore.logout() }>Logout</a>
		    </div>
		  </div>
		  
		  
	      </header>
	);
    }
}));

export default MainNavigation;

