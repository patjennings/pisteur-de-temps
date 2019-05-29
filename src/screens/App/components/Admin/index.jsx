import React, { Component } from 'react';

import {observer, inject} from "mobx-react";

import MainNavigation from 'sharedComponents/MainNavigation';

import ClientsManager from './components/ClientsManager';
import ProjectsManager from './components/ProjectsManager';
import UsersManager from './components/UsersManager';

import retrieveFormData from "utils/retrieveFormData";

import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import "assets/styles/main.scss";
import "./styles.scss";


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
	const manager =
	   <div className="manager">
	      <nav>
	         <div className="nav nav-tabs" id="nav-tab" role="tablist">
	            <a className="nav-item nav-link w-25" id="nav-clients-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="false">Clients<br/><span className="text-muted">Gérer les clients</span></a>
	            <a className="nav-item nav-link w-25 active" id="nav-projects-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="true">Projects<br/><span className="text-muted">Gérer et modifier les projets</span></a>
	            <a className="nav-item nav-link w-25" id="nav-users-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Users<br/><span className="text-muted">Gérer les utilisateurs</span></a>
	         </div>
	       </nav>
	       <div className="tab-content" id="nav-tabContent">
	          <div className="tab-pane fade clients-manager" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
	             <ClientsManager/>
	          </div>
	          <div className="tab-pane fade projects-manager show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
	             <ProjectsManager/>
	          </div>
	          <div className="tab-pane fade users-manager" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
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
			  
				 <div className="personal edited">
				       <form onSubmit={this.handleSubmit}>
				       <div className="row">
				             <div className="col-4">
						   <label htmlFor={"user-input--firstname-"+this.props.authStore.userId}>First name</label>
						  <input className="form-control"
							     name="firstName"
							     id={"user-input--firstname-"+this.props.authStore.userId}
							     type="text"
							     aria-label="Input"/>
						 </div>
						 <div className="col-4">
						       <label htmlFor={"user-input--lastname-"+this.props.authStore.userId}>Second name</label>
						       <input className="form-control"
								  name="lastName"
								  id={"user-input--lastname-"+this.props.authStore.userId}
								  type="text"
								  aria-label="Input"/>
						     </div>
					   </div>
					   <div className="row">
						 <div className="col-6">
						       <label htmlFor={"user-input--email-"+this.props.authStore.userId}>Email</label>
						       <input className="form-control"
								  name="email"
								  id={"user-input--email-"+this.props.authStore.userId}
								  type="text"
								  aria-label="Input"/>
						     </div>

					       </div>
					       <div className="row">
						     <div className="col-6">
							   <button
								 className="btn btn-primary">Update</button>&nbsp;&nbsp;
							       <button
								     className="btn btn-light" onClick={this.cancelEdit}>Cancel</button>
							 </div>

						   </div>
					   </form>
				     </div>
			    : 
				 <div className="personal">
				       <div className="row">
				             <div className="col-10">
						   <h3>{this.props.authStore.user.firstName} {this.props.authStore.user.lastName}</h3>
						 </div>
						 <div className="col-2">
						       <button className="btn btn-light" type="button" onClick={this.editItem}>Edit infos</button>
						     </div>
					   </div>
					   <div className="row">
						 <div className="col-6">
						       <p>{this.props.authStore.user.email}</p>
						     </div>

					       </div>
					       <div className="row">
						     <div className="col-6">
							   <p className="text-muted">Signed on {this.props.authStore.user.date}</p>
							 </div>

						   </div>	   
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

