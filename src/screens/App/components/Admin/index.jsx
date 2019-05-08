import React, { Component } from 'react';

import {observer, inject} from "mobx-react";

import MainNavigation from 'sharedComponents/MainNavigation';
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import "./styles.scss";
import "assets/styles/main.scss";

const Admin = inject("mainStore", "authStore")(observer(class Admin extends Component {
    constructor(props){
	super(props);
    }

    adminData(){

    }

    render() {
	// console.log("Admin is rendered");
	return (
	    
	    <div className="admin logged-in">
	      <MainNavigation />
  	      {this.props.authStore.isLoading == true ?
		  <p>Wait a minute</p>
		      :
		      <div>
			    <h5>{this.props.authStore.user.firstName} {this.props.authStore.user.lastName}</h5>
				<p>{this.props.authStore.user.email}</p>
				    <p>{this.props.authStore.user.date}</p>
				<p></p>
				<ul>
 	      			      {this.props.authStore.user.projects.map(p => <li>{getProjectName(this.props.mainStore.projectsDefinitions, p)}</li>)}
 	       </ul>
	       </div>
	      }

	    </div>
	);
    }
}))

function adminData(){

}

export default Admin;


 // <p>{this.props.authStore.user.firstName}</p>
 // 	      <p>{this.props.authStore.user.lastName}</p>
 // 	      <h3>Related projects</h3>     
 // 	      <ul>
 // 	      	{this.props.authStore.user.projects.map(p => {
 // 	      	    return <li>{getProjectName(this.props.mainStore.projectsDefinitions, p)}</li>;
 // 	      	})}
 // 	      </ul>

