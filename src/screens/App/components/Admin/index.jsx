import React, { Component } from 'react';

import {observer, inject} from "mobx-react";

import MainNavigation from 'sharedComponents/MainNavigation';

import ClientsManager from './components/ClientsManager';
import ProjectsManager from './components/ProjectsManager';
import UsersManager from './components/UsersManager';
import ParamsManager from './components/ParamsManager';

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
	      <a className="nav-item nav-link w-25" id="nav-clients-tab" data-toggle="tab" href="#nav-clients" role="tab" aria-controls="nav-clients" aria-selected="false">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.clients.name}<br/><span className="text-muted">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.clients.description}</span></a>
	            <a className="nav-item nav-link w-25 active" id="nav-projects-tab" data-toggle="tab" href="#nav-projects" role="tab" aria-controls="nav-projects" aria-selected="true">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.projects.name}<br/><span className="text-muted">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.projects.description}</span></a>
	      <a className="nav-item nav-link w-25" id="nav-users-tab" data-toggle="tab" href="#nav-users" role="tab" aria-controls="nav-users" aria-selected="false">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.users.name}<br/><span className="text-muted">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.users.description}</span></a>
	      <a className="nav-item nav-link w-25" id="nav-params-tab" data-toggle="tab" href="#nav-params" role="tab" aria-controls="nav-params" aria-selected="false">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.params.name}<br/><span className="text-muted">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.params.description}</span></a>
	         </div>
	       </nav>
	       <div className="tab-content" id="nav-tabContent">
	          <div className="tab-pane fade clients-manager" id="nav-clients" role="tabpanel" aria-labelledby="nav-clients-tab">
	             <ClientsManager/>
	          </div>
	          <div className="tab-pane fade projects-manager show active" id="nav-projects" role="tabpanel" aria-labelledby="nav-projects-tab">
	             <ProjectsManager/>
	          </div>
	          <div className="tab-pane fade users-manager" id="nav-users" role="tabpanel" aria-labelledby="nav-users-tab">
	             <UsersManager/>
	          </div>
	          <div className="tab-pane fade params-manager" id="nav-params" role="tabpanel" aria-labelledby="nav-params-tab">
	             <ParamsManager/>
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
						   <label htmlFor={"user-input--firstname-"+this.props.authStore.userId}>{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.main.edit.first_name}</label>
						  <input className="form-control"
							     name="firstName"
							     id={"user-input--firstname-"+this.props.authStore.userId}
							     type="text"
							     aria-label="Input"/>
						 </div>
						 <div className="col-4">
						       <label htmlFor={"user-input--lastname-"+this.props.authStore.userId}>{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.main.edit.second_name}</label>
						       <input className="form-control"
								  name="lastName"
								  id={"user-input--lastname-"+this.props.authStore.userId}
								  type="text"
								  aria-label="Input"/>
						     </div>
					   </div>
					   <div className="row">
						 <div className="col-6">
						       <label htmlFor={"user-input--email-"+this.props.authStore.userId}>{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.main.edit.email}</label>
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
								 className="btn btn-primary">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.main.edit.update}</button>&nbsp;&nbsp;
							       <button
								     className="btn btn-light" onClick={this.cancelEdit}>{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].global.cancel}</button>
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
						       <button className="btn btn-light" type="button" onClick={this.editItem}>{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.main.edit_infos}</button>
						     </div>
					   </div>
					   <div className="row">
						 <div className="col-6">
						       <p>{this.props.authStore.user.email}</p>
						     </div>

					       </div>
					       <div className="row">
						     <div className="col-6">
							   <p className="text-muted">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.main.sign_date} {this.props.authStore.user.date}</p>
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
}));

export default Admin;
