import React, { Component } from 'react';
import {observer, inject} from "mobx-react";
import User from "./components/User";

import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import "./styles.scss";
import "assets/styles/main.scss";

const UsersManager = inject("mainStore", "authStore")(observer(class UsersManager extends Component {
    constructor(props){
	super(props);
	this.changeOrder = this.changeOrder.bind(this);
    }
    changeOrder(){
	console.log("sort !");
    }

    render() {
	return (
	   

	    <div>
	      <div className="projects-header pane-header">
		<div className="actions">
		  <form>
		    <div className="row">
		      <div className="col-6">
			<input className="form-control"
  			       name="search"
  			       id={"user-input--name"}
  			       type="text"
  			       aria-label="Input"
			       placeholder="Search"/>
		      </div>
		      <div className="col-6">
			<div className="btn-group">
			  <button type="button" className="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			    Filter
			  </button>
			  <div className="dropdown-menu">
			    <a className="dropdown-item" href="#" onClick={this.changeOrder} sort="name">Name</a>
			    <a className="dropdown-item" href="#" onClick={this.changeOrder} sort="date">Date added</a>
			    <a className="dropdown-item" href="#" onClick={this.changeOrder} sort="role">Role</a>
			  </div>
			</div>
		      </div>
		    </div>
		    
		  </form>
		</div>
		<div className="column-name">
		  <div className="row">
		    <div className="col-6">
		      User
		    </div>
		    <div className="col-4">
		      Role
		    </div>		   
		  </div>
		</div>
	      </div>
	      <div className="projects-content pane-content">
		<ul>
		  {this.props.mainStore.usersDefinitions.map(u => <User key={u._id} userid={u._id} firstName={u.firstName} lastName={u.lastName} isAdmin={u.isAdmin} isFirst={u.isFirst}/>)}
                </ul>
	      </div>
            </div>
	);
    }
}));

export default UsersManager;
