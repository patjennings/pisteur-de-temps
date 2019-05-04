import React, { Component } from 'react';

import {observer, inject} from "mobx-react";

import "./styles.scss";
import "assets/styles/main.scss";

const Login = inject("mainStore")(observer(class Login extends Component {
    constructor(props){
	super(props);
    }

    render() {
	// console.log("Login is rendered");
	return (
	    <div className="login logged-out">

	      <h1>Login...</h1>
	      
	    </div>
	);
    }
}));

export default Login;
