import React, { Component } from 'react';
import {observer, inject} from "mobx-react";
import User from "./components/User";

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
	      <ul>
		{this.props.mainStore.usersDefinitions.map(u => <li key={u._id}><User key={u._id} userid={u._id} firstName={u.firstName} lastName={u.lastName} isAdmin={u.isAdmin} isFirst={u.isFirst}/></li>)}

	      </ul>
	    </div>
	);
    }
}));

export default UsersManager;
