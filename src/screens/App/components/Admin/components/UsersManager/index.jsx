import React, { Component } from 'react';

import {observer, inject} from "mobx-react";

import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import "./styles.scss";
import "assets/styles/main.scss";

const UsersManager = inject("mainStore", "authStore")(observer(class UsersManager extends Component {
    constructor(props){
	super(props);
    }

    render() {
	return (
	    <div>
	      These are users
	    </div>
	);
    }
}));

export default UsersManager;
