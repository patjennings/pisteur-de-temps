import React, { Component } from 'react';

class ProjectTrack extends Component {
    constructor(props){
	super(props);
    }
    render() {

	return (
	    <tr className="track">
	      <td>{this.props.task}</td>
	      <td>{this.props.value}</td>
	      <td>{this.props.comment}</td>
	      <td>{this.props.username}</td>
	      <td>{this.props.date}</td>
	      <td><a className="track-edit d-flex align-items-center" href="#" data-toggle="tooltip" data-placement="top" title="Edit"><i className="ico ico-medium">pen</i></a></td>
	      <td><a className="track-delete d-flex align-items-center" href="#" data-toggle="tooltip" data-placement="top" title="Delete"><i classclassName="ico ico-medium">trash</i></a></td>
	    </tr>
	);
    }
}

export default ProjectTrack;

