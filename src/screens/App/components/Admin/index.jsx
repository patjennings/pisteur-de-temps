import React, { Component } from 'react';

import {observer, inject} from "mobx-react";

import MainNavigation from 'sharedComponents/MainNavigation';

import ClientsManager from './components/ClientsManager';
import ProjectsManager from './components/ProjectsManager';
import UsersManager from './components/UsersManager';

import retrieveFormData from "utils/retrieveFormData";

import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import "./styles.scss";
import "assets/styles/main.scss";

const Admin = inject("mainStore", "authStore")(observer(class Admin extends Component {
    constructor(props){
	super(props);

	this.state = {
	    isEdited: false
	};
	this.editItem = this.editItem.bind(this);
	this.cancelEdit = this.cancelEdit.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.populateFields = this.populateFields.bind(this);
    }
    componentDidUpdate(){
	if(this.state.isEdited){
	    this.populateFields();
	}
    }
    
    cancelEdit(){
	this.setState({
	    isEdited: false
	});
    }
    editItem(){
	// this.populateFields();
	this.setState({
	    isEdited: true
	});
    }

    populateFields(){
	// console.log("populate fields");
	let inputFirstName = document.getElementById("user-input--firstname-"+this.props.authStore.userId);
	let inputLastName =  document.getElementById("user-input--lastname-"+this.props.authStore.userId);
	let inputEmail =     document.getElementById("user-input--email-"+this.props.authStore.userId);
	
	inputFirstName.value = this.props.authStore.user.firstName;
	inputLastName.value = this.props.authStore.user.lastName;
	inputEmail.value = this.props.authStore.user.email;
    }

    handleSubmit(e){
	e.preventDefault();
	let fd = retrieveFormData(e.target, this.props.authStore.userId);

	console.log(fd);
	
	// on lance la requête
	this.props.mainStore.updateUser(this.props.authStore.userId, fd, true);
	
	this.setState({
	    isEdited: false
	});	
    }

    render() {

	// console.log("Admin is rendered");
	const manager = <div className="manager row">
	      <nav>
	      <div className="nav nav-tabs" id="nav-tab" role="tablist">
	      <a className="nav-item nav-link" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="false">Clients<br/><span className="text-muted">Gérer les clients</span></a>
	      <a className="nav-item nav-link active" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="true">Projects<br/><span className="text-muted">Gérer et modifier les projets</span></a>
	      <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Users<br/><span className="text-muted">Modifier le statut des utilisateurs</span></a>
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
	    </div>;
	
	
	return (
	    <div className="logged-in">
	      <MainNavigation />
	      <div className="admin container">

  	      {this.props.authStore.isLoading == true ? <p>Wait a minute</p> :
		  <div >
		  {this.state.isEdited ?
			     <form onSubmit={this.handleSubmit}>
				   <input className="form-control"
					      name="firstName"
					      id={"user-input--firstname-"+this.props.authStore.userId}
					      type="text"
					      aria-label="Input"/>
				       <input className="form-control"
						  name="lastName"
						  id={"user-input--lastname-"+this.props.authStore.userId}
						  type="text"
						  aria-label="Input"/>
					   <input className="form-control"
						      name="email"
						      id={"user-input--email-"+this.props.authStore.userId}
						      type="text"
						      aria-label="Input"/>
					       <button
						     className="btn btn-primary btn-sm">Update</button>
						   <button
							 className="btn btn-light btn-sm" onClick={this.cancelEdit}>Cancel</button>
				 </form>
			    : 
				 <div className="personal row">
				       <a className="track-edit d-flex align-items-center" href="#" data-toggle="tooltip" data-placement="top" title="Edit" onClick={this.editItem} ><i className="ico ico-medium">pen</i></a>
					   <h5>{this.props.authStore.user.firstName} {this.props.authStore.user.lastName}</h5>
				      <p>{this.props.authStore.user.email}</p>
					  <p>{this.props.authStore.user.date}</p>
					      
				 </div>}
			

	       {this.props.authStore.user.isAdmin ? manager : null}
	       
	       
	       </div>
		  }
	      </div>
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

