import React, { Component } from 'react';
import axios from "axios";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import {observer, inject} from "mobx-react";

import "./styles.scss";

const ClientsSelector = inject("mainStore")(observer(class ClientsSelector extends Component {
    constructor(props){
	super(props);

	this.state = {
	    activeClient: this.props.activeClient
	};

	// binds
	this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    handleDropdownChange(e){
	e.preventDefault();
	
	// on point e.currentTarget pour obtenir l'élément qui a le handler, et pas l'enfant sur lequel on clicke (qui est e.target)

	let clientId; // get the id
	
	if(e.target.nodeName === "SPAN"){ // handle case where child is clicked
	    clientId = e.currentTarget.parentNode.getAttribute("id");
	} else {
	    clientId = e.currentTarget.getAttribute("id");
	}
	this.setState({activeClient: clientId});
	this.props.onChange(clientId);
    }

    render() {
	return (
	    <div className="dropdown client-selector">
	      <button
		className="dropdown-toggle btn"
		data-toggle="dropdown"
		aria-haspopup="true"
		aria-expanded="false">
		{this.state.activeClient == null ?
		    "Select a client" :
		    <div className="">
			  {getClientName(this.props.mainStore.clientsDefinitions, this.state.activeClient)}
			</div>
		    }
	      </button>
	      
	      
	      <div className="dropdown-menu"
		   aria-labelledby="dropdownMenuButton">
		{
		    this.props.mainStore.clientsDefinitions.map(p => {
			// console.log(p);
			return  <a className="dropdown-item" href="#" key={p._id} id={p._id} onClick={this.handleDropdownChange}>{p.name}</a>;
		    })
		}
	      </div>
	    </div>

	);
    }
}));

export default ClientsSelector;
