import React, { Component } from 'react';
import {readableDate} from "utils/readableDate";
import { getClientName, getProjectName, getUserName, getProjectsNumberForClient } from "utils/defsConverter";
import retrieveFormData from "utils/retrieveFormData";
import ClientsSelector from "sharedComponents/ClientsSelector";

import {toJS} from "mobx";
import {inject, observer} from "mobx-react";

// import ProjectsSelector from "sharedComponents/ProjectsSelector";

import "./styles.scss";

const User = inject("mainStore", "authStore")(observer(class User extends Component {
    constructor(props){
	super(props);


	// const clid = toJS(this.props.mainStore.projectsDefinitions.find(item => item._id == this.props.mainStore.activeProject)).client;
	
	this.state = {
	    // projectName: getProjectName(this.props.mainStore.projectsDefinitions, this.props.mainStore.activeProject),
	    // clientId: this.props.mainStore.activeProjectDetails.client,
	    // clientName: getProjectName(this.props.mainStore.clientsDefinitions, this.props.mainStore.activeProjectDetails.client),
	    isEdited: false,
	    isAdmin: this.props.isAdmin
	    // activeClient: this.props.clientid,
	    // hasTracks: null
	    // activeProject: this.props.mainStore.activeProject
	};
	
	// binds
	// this.deleteItem = this.deleteItem.bind(this);
	this.editItem = this.editItem.bind(this);
	this.cancelEdit = this.cancelEdit.bind(this);
	// this.setActiveClient = this.setActiveClient.bind(this);
	this.changeRole = this.changeRole.bind(this);
	// this.deleteProject = this.deleteProject.bind(this);
	// this.getTracksNumber = this.getTracksNumber.bind(this);
    }

    componentDidUpdate(){
	
    }

    editItem(e){
	this.setState({isEdited: true});
    }
    cancelEdit(e){
	this.setState({isEdited: false});
    }
    
    // deleteItem(e){
    // 	this.props.mainStore.deleteProject(this.props.projectid);
    // }
    
    deleteUser(){
	// console.log("delete project");
	this.props.mainStore.deleteUser(this.props.projectid);
    }


    // handleSubmit(e){
    // 	// console.log("submit");
    // 	e.preventDefault();
    // 	let fd = retrieveFormData(e.target, this.props.authStore.userId);

    // 	// console.log(fd);
	
    // 	// on lance la requête
    // 	// this.props.mainStore.updateProject(this.props.projectid, fd);

    // 	// const cli = toJS(this.props.mainStore.projectsDefinitions.find(item => item._id == this.state.activeProject)).client;
	
    // 	this.setState({
    // 	    isEdited: false
    // 	});	
    // }

    setActiveClient(c){
	
	this.setState({activeClient: c});

	// console.log(c);
	// console.log(getClientName(this.props.mainStore.clientsDefinitions, c));
    }
    // getTracksNumber(){
    // 	const trk = this.props.mainStore.loadTrackedTime(this.props.projectid);
    // 	// console.log(toJS(this.props.mainStore.activeTrackedTime));
    // 	// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> "+trk.data.message.length);
    // 	// this.setState({projectTracks: t})
    // 	// console.log(this.props.mainStore.activeTrackedTime);
    // 	// if(this.props.mainStore.activeTrackedTime)
    // }

    changeRole(e){
	console.log("//////////// "+this.props.userid);
	const value = e.currentTarget.innerText == "Admin" ? true : false;
	const data = {"isAdmin": value}; // change the user role
	this.props.mainStore.updateUser(this.props.userid, data, false);
	this.setState({
	    isAdmin : value
	});

    }
    
    render() {

	// console.log("/////////// "+this.props.mainStore.activeTrackedTime);
	console.log(this.state.isAdmin);
	

	return (
	    <div className="user">
	      {this.props.firstName} {this.props.lastName} 
	      <div className="btn-group">
		<button type="button" className={this.props.isFirst || this.props.authStore.userId == this.props.userid ? "btn btn-light dropdown-toggle disabled" : "btn btn-light dropdown-toggle" }  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		  {this.state.isAdmin ? "Admin" : "User"}

		</button>
		<div className="dropdown-menu">
		  <a className="dropdown-item" href="#" onClick={this.changeRole} adm="true">Admin</a>
		  <a className="dropdown-item" href="#" onClick={this.changeRole} adm="false">User</a>
		</div>
	      </div>
	      {this.state.isAdmin ? <span className="badge badge-info">Admin</span> : null}
	      
	      
	    </div>
	);


    }
}));

export default User;
