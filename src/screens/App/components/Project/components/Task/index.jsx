import React, { Component } from 'react';
import {readableDate} from "utils/readableDate";
import deleteTask from "utils/deleteTask";

import "./styles.scss";

class Task extends Component {
    constructor(props){
	super(props);
	this.deleteItem = this.deleteItem.bind(this);
    }
    async deleteItem(e){
	const req = await deleteTask(this.props.projectid, this.props.taskid); // on attend que la requête soit bien éxécutée, avant d'avertir du changement
	this.props.onChange();
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
	      <td><a className="track-delete d-flex align-items-center" href="#" data-toggle="tooltip" data-placement="top" title="Delete"><i className="ico ico-medium ico-trash" onClick={this.deleteItem}>trash</i></a></td>
	    </tr>
	);
    }
}

export default Task;

