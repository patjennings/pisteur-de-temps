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
	      <header className="navbar navbar-expand-lg navbar-dark bg-dark">
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		  <span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse" id="navbarNav">
		  <ul className="navbar-nav">
		    <li className="nav-item">
		      <a className="nav-link" onClick={() => push('/overview')} name="dashboard">Dashboard <span className="sr-only">(current)</span></a>
		    </li>
		    <li className="nav-item">
		      <a className="nav-link" onClick={() => push('/synthesis')} name="synthesis">Synthesis <span className="sr-only">(current)</span></a>
		    </li>
		    <li className="nav-item">
		      <a className="nav-link" onClick={() => push('/admin')} name="admin">Admin <span className="sr-only">(current)</span></a>
		    </li>
		    <li className="nav-item">
		      <a className="nav-link" onClick={() => this.props.authStore.logout() } name="admin">Logout <span className="sr-only">(current)</span></a>
		    </li>
		  </ul>
		  {location.pathname}
		</div>
	      </header>
	);
    }
}));

export default MainNavigation;

