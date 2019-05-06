import React, { Component } from 'react';

import {observer, inject} from "mobx-react";

import "./styles.scss";
import "assets/styles/main.scss";

const Nav = inject("mainStore")(observer(class Nav extends Component {
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
	// console.log("Nav is rendered");
	return (
	      <header className="navbar navbar-expand-lg navbar-dark bg-dark">
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		  <span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse" id="navbarNav">
		  <ul className="navbar-nav">
		    <li className={this.props.mainStore.pageDisplayed == "dashboard" ? "nav-item active" : "nav-item"}>
		      <a className="nav-link" href="#" onClick={e => this.navigate(e)} name="dashboard">Dashboard <span className="sr-only">(current)</span></a>
		    </li>
		    <li className={this.props.mainStore.pageDisplayed == "synthesis" ? "nav-item active" : "nav-item"}>
		      <a className="nav-link" href="#" onClick={e => this.navigate(e)} name="synthesis">Synthesis <span className="sr-only">(current)</span></a>
		    </li>
		    <li className={this.props.mainStore.pageDisplayed == "admin" ? "nav-item active" : "nav-item"}>
		      <a className="nav-link" href="#" onClick={e => this.navigate(e)} name="admin">Admin <span className="sr-only">(current)</span></a>
		    </li>
		  </ul>
		</div>
	      </header>
	);
    }
}));

export default Nav;

