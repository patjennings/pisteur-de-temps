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

	return (
	      <header className="" id="main-navigation">

		<ul className="main-nav justify-content-center">
		    <li className="main-nav-item">
		      <a className="main-nav-link" onClick={() => push('/overview')} name="dashboard">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].navigation.dashboard}<span className="sr-only">(current)</span></a>
		    </li>
		    <li className="main-nav-item">
		      <a className="main-nav-link" onClick={() => push('/synthesis')} name="synthesis">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].navigation.synthesis}<span className="sr-only">(current)</span></a>
		    </li>
		  </ul>

		  
		  <div className="dropdown admin">
		    <button className="btn dropdown-toggle" type="button" id="adminMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		      <small>{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].navigation.user.connected_as} </small>{this.props.authStore.user.firstName}
		    </button>
		    <div className="dropdown-menu" aria-labelledby="adminMenuButton">
		      <a className="dropdown-item" onClick={() => push('/admin')}>{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].navigation.user.admin}</a>
		      <div className="dropdown-divider"></div>
		      <a className="dropdown-item" onClick={() => this.props.authStore.logout() }>{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].navigation.user.logout}</a>
		    </div>
		  </div>
		  
		  
	      </header>
	);
    }
}));

export default MainNavigation;
