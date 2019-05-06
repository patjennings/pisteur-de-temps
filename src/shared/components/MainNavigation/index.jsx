import React, { Component } from 'react';

import {observer, inject} from "mobx-react";

import "./styles.scss";
import "assets/styles/main.scss";

const MainNavigation = inject("mainStore")(observer(class MainNavigation extends Component {
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
	// console.log("MainNavigation is rendered");
	return (
	      <header className="navbar navbar-expand-lg navbar-dark bg-dark">
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		  <span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse" id="navbarNav">
		  <ul className="navbar-nav">
		    <li className="nav-item">
		      <a className="nav-link" href="/overview" onClick={e => this.navigate(e)} name="dashboard">Dashboard <span className="sr-only">(current)</span></a>
		    </li>
		    <li className="nav-item">
		      <a className="nav-link" href="/synthesis" onClick={e => this.navigate(e)} name="synthesis">Synthesis <span className="sr-only">(current)</span></a>
		    </li>
		    <li className="nav-item">
		      <a className="nav-link" href="/admin" onClick={e => this.navigate(e)} name="admin">Admin <span className="sr-only">(current)</span></a>
		    </li>
		  </ul>
		</div>
	      </header>
	);
    }
}));

export default MainNavigation;

