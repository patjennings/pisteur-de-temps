import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';
import ListClientProjects from "./components/ListClientProjects";
import AddClient from './components/AddClient';

import {toJS} from "mobx";
import {inject, observer} from "mobx-react";

import "./styles.scss";

const Navigation = inject("mainStore")(observer(class Navigation extends Component {
    constructor(props){
	super(props);
	this.state = {
	    isAddingClient: false,
	    search: '',
	    isSearching: false
	};
	this.addClient = this.addClient.bind(this);
	this.handleChange = this.handleChange.bind(this);
	this.resetSearch = this.resetSearch.bind(this);
    }
    
    addClient(){
	this.setState({isAddingClient: true});
    }

    handleChange(e){
	// console.log("reset navigation");
	this.setState({isAddingClient: false});
	this.setState({
	    search: e.target.value,
	    isSearching: true
	});
	// console.log(e.target.value);
    }
    resetSearch(){
	const searchInput = document.querySelector(".form-control");
	searchInput.value = '';
	this.setState({
	    search: '',
	    isSearching: false
	})
    }

    render() {
	
	
	return (
	    <div className="row nav-projects">

	      {this.state.isSearching ? <div className="search--reset" onClick={this.resetSearch}><i className="ico ico-medium">cross_circle</i></div> : null }
	      <input className="form-control form-control-dark w-100 mb-4" type="text" placeholder="Search" aria-label="Search" onChange={this.handleChange}/>
	      <ReactCSSTransitionGroup
		transitionName="fade"
		transitionEnterTimeout={500}
		transitionLeaveTimeout={300}
		className="nav--lists">
		<div className="nav--lists--inner">
		  {this.props.mainStore.clientsDefinitions.map(c => {
		      return (
			  <ListClientProjects key={c._id} name={c.name} id={c._id} currentSearch={this.state.search}/>
		      );
		  })}
	    </div>
		</ReactCSSTransitionGroup>
		{ this.state.isAddingClient ? <AddClient onChange={this.handleChange}/> : null }
	    
		<div className="footer">
		<button className="btn btn-primary" type="button" onClick={this.addClient}>Add a client</button>
		</div>
		</div>
	);
    }
}));

export default Navigation;
