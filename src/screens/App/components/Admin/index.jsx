import React, { Component } from 'react';

import {observer, inject} from "mobx-react";

import "./styles.scss";
import "assets/styles/main.scss";

const Admin = inject("mainStore")(observer(class Admin extends Component {
    constructor(props){
	super(props);
    }

    render() {
	// console.log("Admin is rendered");
	return (
	    <div className="admin logged-in">

	     <h1>This is the admin...</h1>
	      
	    </div>
	);
    }
}))

export default Admin;

