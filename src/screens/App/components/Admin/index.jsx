import React, { Component } from 'react';

import {observer, inject} from "mobx-react";

import MainNavigation from 'sharedComponents/MainNavigation';

import ClientsManager from './components/ClientsManager';
import ProjectsManager from './components/ProjectsManager';
import UsersManager from './components/UsersManager';

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
  	      {this.props.authStore.isLoading == true ? <p>Wait a minute</p> :
		  <div className="admin">
			<div className="personal">
			      <h5>{this.props.authStore.user.firstName} {this.props.authStore.user.lastName}</h5>
				  <p>{this.props.authStore.user.email}</p>
				  <p>{this.props.authStore.user.date}</p>
				      
				      <ul>
 	      				    {/* />{this.props.authStore.user.projects.map(p => <li key={p}>{p}</li>)} */}
 	       </ul>
	       </div>
	       <div className="manager">
	       <nav>
	       <div className="nav nav-tabs" id="nav-tab" role="tablist">
	       <a className="nav-item nav-link" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="false">Clients</a>
	       <a className="nav-item nav-link active" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="true">Projects</a>
	       <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Users</a>
	       </div>
	       </nav>
	       <div className="tab-content" id="nav-tabContent">
	       <div className="tab-pane fade" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
	       <ClientsManager/>
	       </div>
	       <div className="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
	       <ProjectsManager/>
	       </div>
	       <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
	       <UsersManager/>
	       </div>
	       </div>
	       </div>
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

