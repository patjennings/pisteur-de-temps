import React, { Component } from 'react';
import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import "./styles.scss";

class ListClientProjects extends Component {
    constructor(props){
	super(props);
	this.state = {
	    hasProject: false,
	    definitions: {}
	};
	this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount(){
    	this.setState({
    	    definitions: this.props.defs
    	});
    }
    checkNoProject(){
	if(this.state.hasProject === false){
	    return <p className="text-muted">No project defined</p>;
	}
    }
    handleClick(data, event){
	this.props.onChange(data);
    }
    render() {
	return (
	    <div>
	    <h5 className="client-name d-flex justify-content-between align-items-center ">
	      <span>{this.props.name}</span>
	      <a className="project-add d-flex align-items-center" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Add a project"><i className="ico">plus_circle</i></a>
	    </h5>
	    <ul>
	      {this.state.definitions.projectsDefinitions.map(p => {
		  if(p.client === this.props.id){
		      this.state.hasProject = true;
		      return <li key={p._id} onClick={e => this.handleClick(p, e)}>{p.name}</li>;
		  }
	      })}
	      {this.checkNoProject()}
	    </ul>
	    </div>
	);
    }
}

export default ListClientProjects;
