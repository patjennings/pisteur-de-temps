import React, { Component } from 'react';
import {readableDate} from "utils/readableDate";

import "./styles.scss";

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
	      <td>{readableDate(this.props.date)}</td>
	      <td><a className="track-edit d-flex align-items-center" href="#" data-toggle="tooltip" data-placement="top" title="Edit"><i className="ico ico-medium">pen</i></a></td>
	      <td><a className="track-delete d-flex align-items-center" href="#" data-toggle="tooltip" data-placement="top" title="Delete"><i className="ico ico-medium ico-trash">trash</i></a></td>
	    </tr>
	);
    }
}

export default ProjectTrack;

