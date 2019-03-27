import React from 'react';

class Project extends React.Component{
    constructor(props){
	super(props);
    }
    render(){
	return(
	  <div className="project">
	    <h4>{this.props.name}</h4>	    
	    <p>{this.props.id}</p>
	  </div>
  
	);
    }
}

export default Project;
