import React, { Component } from 'react';

import {observer, inject} from "mobx-react";

import MainNavigation from 'sharedComponents/MainNavigation';

import "./styles.scss";
import "assets/styles/main.scss";

const Synthesis = inject("mainStore")(observer(class Synthesis extends Component {
    constructor(props){
	super(props);
    }

    render() {
	// console.log("Synthesis is rendered");
	return (
	    <div className="admin logged-in">
	      <MainNavigation />
	     <h1>This is the synthesis...</h1>
	      
	    </div>
	);
    }
}))

export default Synthesis;

