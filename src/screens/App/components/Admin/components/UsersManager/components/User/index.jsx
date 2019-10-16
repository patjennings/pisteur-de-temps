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
	    isEdited: false,
	    isAdmin: this.props.isAdmin
	};
	
	// binds
	this.editItem = this.editItem.bind(this);
	this.cancelEdit = this.cancelEdit.bind(this);
	this.changeRole = this.changeRole.bind(this);
    }

    componentDidUpdate(){
	
    }

    editItem(e){
	this.setState({isEdited: true});
    }
    cancelEdit(e){
	this.setState({isEdited: false});
    }
        
    deleteUser(){
	this.props.mainStore.deleteUser(this.props.projectid);
    }
    setActiveClient(c){
	
	this.setState({activeClient: c});

    }

    changeRole(e){
	// console.log("//////////// "+this.props.userid);
	const value = e.currentTarget.innerText == "Admin" ? true : false;
	const data = {"isAdmin": value}; // change the user role
	this.props.mainStore.updateUser(this.props.userid, data, false);
	this.setState({
	    isAdmin : value
	});

    }
    
    render() {

	// console.log("/////////// "+this.props.mainStore.activeTrackedTime);
	// console.log(this.state.isAdmin);
	

	return (

	    <li className="user">
	      <div className="row">
		<div className="col-4">
		  {this.props.firstName} {this.props.lastName}
		</div>
		<div className="col-2">
		  {this.state.isAdmin ? <span className="badge badge-info">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.users.select.admin}</span> : null}
		</div>
		<div className="col-4">
		  <div className="btn-group">
		    <button type="button" className={this.props.isFirst || this.props.authStore.userId == this.props.userid ? "btn btn-light dropdown-toggle disabled" : "btn btn-light dropdown-toggle" }  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		      {this.state.isAdmin ? this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.users.select.admin : this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.users.select.user}

		    </button>
		    <div className="dropdown-menu">
		      <a className="dropdown-item" href="#" onClick={this.changeRole} adm="true">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.users.select.admin}</a>
		      <a className="dropdown-item" href="#" onClick={this.changeRole} adm="false">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.users.select.user}</a>
		    </div>
		  </div>
		</div>
		
	      </div>
	    </li>
	);


    }
}));

export default User;
