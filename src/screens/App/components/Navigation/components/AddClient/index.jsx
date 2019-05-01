import React, { Component } from 'react';
// import axios from "axios";
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import "./styles.scss";

class AddClient extends Component {
    constructor(props){
	super(props);
	this.state = {
	    definitions: this.props.defs
	};
    }
    render() {
	return (
	    <div className="row">
	    </div>
	);
    }
}

export default AddClient;
