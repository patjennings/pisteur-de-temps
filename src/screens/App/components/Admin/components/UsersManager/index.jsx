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
	this.handleChange = this.handleChange.bind(this);
	this.state = {
	    search: ''
	}
    }
    changeOrder(){
	console.log("sort !");
    }
    handleChange(e){
	this.setState({
	    search: e.target.value
	});
    }

    render() {
	console.log(this.state.search);
	return (

	    <div>
	      <div className="projects-header pane-header">
		<div className="actions">
		  <form>
		    <div className="row">
		      <div className="col-4">
			<input className="form-control"
  			       name="search"
  			       id={"user-input--name"}
  			       type="text"
  			       aria-label="Input"
			       placeholder="Search"
			       onChange={this.handleChange}/>
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
		  {this.props.mainStore.usersDefinitions.map(u => {
		      const fn = u.firstName;
		      const ln = u.lastName;
		      const fnNoAccent = fn.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // le normalize + replace sert à ne pas prendre en compte les accents pour chercher
		      const lnNoAccent = ln.normalize("NFD").replace(/[\u0300-\u036f]/g, "");


		      const srf = fn.search(new RegExp(this.state.search, "i"));
		      const srl = ln.search(new RegExp(this.state.search, "i"));
		      const srfNoAccent = fnNoAccent.search(new RegExp(this.state.search, "i"));
		      const srlNoAccent = lnNoAccent.search(new RegExp(this.state.search, "i"));
		      
		      if(srf !== -1 || srl !== -1 || srfNoAccent !== -1 || srlNoAccent !== -1){
			  return <User key={u._id} userid={u._id} firstName={u.firstName} lastName={u.lastName} isAdmin={u.isAdmin} isFirst={u.isFirst}/>			  
		      }

			  
		  })}
                </ul>
	      </div>
            </div>
	);
    }
}));

export default UsersManager;
