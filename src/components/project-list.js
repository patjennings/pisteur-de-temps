import React from 'react';
import Project from './project'

class ProjectList extends React.Component{
    constructor(props){
	super(props);
    }

    render(){
	console.log(this.props.projects);
	return(
	    <div>	      
	      {this.props.projects.map( p =>  <Project id={p.id} name={p.name} /> )}
	    </div>
	);
    }
}

export default ProjectList;
