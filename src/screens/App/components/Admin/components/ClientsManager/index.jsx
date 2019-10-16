import React, { Component } from 'react';
import {observer, inject} from "mobx-react";
import AddClient from "../AddClient";
import Client from "./components/Client";

import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import "assets/styles/main.scss";

const ClientsManager = inject("mainStore", "authStore")(observer(class ClientsManager extends Component {
    constructor(props){
	super(props);
	this.state = {
	    isAddingClient: false,
	    search: '',
	    height: window.innerHeight - 420
	};
	this.addClient = this.addClient.bind(this);
	this.handleChange = this.handleChange.bind(this);
	this.handleResize = this.handleResize.bind(this);
	this.changeOrder = this.changeOrder.bind(this);
    }
    changeOrder(){
	// console.log("sort !");
    }

    addClient(){
	this.setState({isAddingClient: true});
    }
handleResize(){
	this.setState({
	    height: window.innerHeight - 420
	})
    }
    handleChange(e){
	// console.log("reset navigation");
	this.setState({isAddingClient: false});
	this.setState({
	    search: e.target.value
	});
    }
    
    render() {
	return (
	     <div>
	      <div className="projects-header pane-header">
		<div className="actions">
		  
		  <div className="row">
		      <div className="col-4">
			<input className="form-control"
  			       name="search"
  			       id={"user-input--name"}
  			       type="text"
  			       aria-label="Input"
			       placeholder={this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.clients.search}
			       onChange={this.handleChange}/>
		      </div>
		      <div className="col-5">
			<div className="btn-group">
			  <button type="button" className="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			    {this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.clients.filter.name}
			  </button>
			  <div className="dropdown-menu">
			    <a className="dropdown-item" href="#" onClick={this.changeOrder} sort="name">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.clients.filter.filter_name}</a>
			    <a className="dropdown-item" href="#" onClick={this.changeOrder} sort="date">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.clients.filter.filter_date_added}</a>
			    <a className="dropdown-item" href="#" onClick={this.changeOrder} sort="role">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.clients.filter.filter_role}</a>
			  </div>
			</div>
		      </div>
		    <div className="col-3">
		      <button className="btn btn-primary float-right" type="button" onClick={this.addClient}><i className="ico">plus</i>&nbsp;{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.clients.add_client}</button>
		      </div>
		    </div>
		    
		  
		 
		</div>
		<div className="column-name">
		  <div className="row">
		    <div className="col-12">
		      {this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].admin.clients.headers.client}
		    </div>
		  </div>
		</div>
	      </div>
	      <div className="projects-content pane-content" style={{height: this.state.height+"px"}}>
		<ul>
		  {this.state.isAddingClient ? <li className="new"><AddClient onChange={this.handleChange} /></li> : null }
		  {this.props.mainStore.clientsDefinitions.map(c => {
		      const cn = getClientName(this.props.mainStore.clientsDefinitions, c._id);
		      const cnNoAccent = cn.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		      const sr = cn.search(new RegExp(this.state.search, "i")); // On checke si on affiche ou pas en fonction du champ de recherche sur le composant parent
		      const srNoAccent = cnNoAccent.search(new RegExp(this.state.search, "i"));
		      if(sr !== -1 || srNoAccent !== -1){
			  return  <Client key={c._id} clientid={c._id}/>
		      }

			  
		  })}
                </ul>
	      </div>
            </div>

	    
	
	);
    }
}));

export default ClientsManager;
