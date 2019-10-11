import React, { Component } from 'react';

import {observer, inject} from "mobx-react";

import {getClientName} from 'utils/defsConverter';

import MainNavigation from 'sharedComponents/MainNavigation';
import Card from "./components/Card";

import {toJS} from "mobx";

import "./styles.scss";
import "assets/styles/main.scss";

const Synthesis = inject("mainStore")(observer(class Synthesis extends Component {
    constructor(props){
	super(props);

	this.state = {
	    search: '',
	    isSearching: false
	};
	this.handleChange = this.handleChange.bind(this);
	this.resetSearch = this.resetSearch.bind(this);
    }
    componentDidMount(){
	const tt = this.props.mainStore.loadTrackedTime(this.props.id);
	console.log(toJS(tt));
    }
    handleChange(e){
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
	    <div className="synthesis logged-in">
	      <MainNavigation />
	      <div className="container-fluid">
		<div className="col-12">
		  <div className="row">
		    <div className="col-2 offset-5">
		      <input className="form-control form-control-dark w-100 mb-4 mt-4" type="text" placeholder="Search" aria-label="Search" onChange={this.handleChange}/>
		    </div>
		  </div>
		  <div className="row">
		    {this.props.mainStore.projectsDefinitions.map(p => {

			const pn = p.name;
			const pnNoAccent = pn.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			const cn = getClientName(this.props.mainStore.clientsDefinitions, p.client);
			const cnNoAccent = cn.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			
			const srProject = pn.search(new RegExp(this.state.search, "i")); // On checke si on affiche ou pas en fonction du champ de recherche sur le composant parent
			const srProjectNoAccent = pnNoAccent.search(new RegExp(this.state.search, "i")); // On checke si on affiche ou pas en fonction du champ de recherche sur le composant parent
			const srClient = cn.search(new RegExp(this.state.search, "i")); // On checke si on affiche ou pas en fonction du champ de recherche sur le composant parent
			const srClientNoAccent = cnNoAccent.search(new RegExp(this.state.search, "i")); // On checke si on affiche ou pas en fonction du champ de recherche sur le composant parent

			console.log(srProjectNoAccent);
			
			// console.log(sr);
			if(srProject !== -1 || srClient !== -1 || srProjectNoAccent !== -1 || srClientNoAccent !== -1){
			    return <Card key={p._id} name={p.name} id={p._id} client={p.client} description={p.description} budget={p.budget} currentSearch={this.state.search}/>
			}
		
			 
			
		    })}
	    </div>
		</div>
		</div>
		</div>
	);
    }
}))

export default Synthesis;

