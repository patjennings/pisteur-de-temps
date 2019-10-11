import React, { Component } from 'react';
import {observer, inject} from "mobx-react";

import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';
import {getFullTime, getPercent} from 'utils/budget';

const Card = inject("mainStore")(observer(class Card extends Component {
    constructor(props){
	super(props);
	this.listProjectsTasks = this.listProjectsTasks.bind(this);
	this.getProjectPercentage = this.getProjectPercentage.bind(this);
    }

    componentDidMount(){
	//
    }
    listProjectsTasks(){
	// console.log("//////------> "+this.props.mainStore.tracksDefinitions.length);
	let res = {};
	let offset = 0;
	
	this.props.mainStore.tracksDefinitions.map(t => {
	    if(t._id == this.props.id){
		t.message.map(m => {
		    if(res[m.task] !== undefined){
		    	res[m.task] += m.value;
		    } else {
		    	let task = {[m.task] : m.value};
		    	Object.assign(res, task);
		    }

		});
	    }
	});

	console.log(res);
	// console.log(this.props.mainStore.tracksDefinitions[i]._id);
	return res;
    }
    getProjectPercentage(value){
	let pc = Math.floor(value*100/this.props.budget);
	return pc;
    }
    render() {
	const tasks = this.listProjectsTasks();
	// let offset = 0;
	
	return (
	    <div className="synthesis-card card">
	      <div className="card-header">
		<div className="row">
		  <div className="col-md-8">
		    <p className="synthesis-card--client">{getClientName(this.props.mainStore.clientsDefinitions, this.props.client)}</p>
		    <h6 className="synthesis-card--name">{this.props.name}</h6>
		    <p className="synthesis-card--description">{this.props.description}</p>
		  </div>
		  <div className="col-md-4">
		    <p className="synthesis-card--budget">{this.props.budget} <span className="budget-unit">jours</span></p>
		  </div>
		</div>
	      </div>
	      <div className="card-body">
		{Object.keys(tasks).map(t => {
		    // offset += this.getProjectPercentage(tasks[t]);
		    return <div className="row">
			<div className="col-md-6">
			      <div className="task-percentage">
				    
				    <div className="progress">
					  <div className="progress-bar bg-success" role="progressbar" style={{width: this.getProjectPercentage(tasks[t])+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
					</div>
				  </div>
			    </div>
		            <div className="col-md-6">
				  <div className="task-name"><span className="badge badge-primary mr-2">{this.getProjectPercentage(tasks[t])+"%"}</span>{t}<span className="task-spent">{tasks[t]} jours</span></div>
				</div>
			</div>;
		})}
		
	      </div>
	      <div className="card-footer"></div>
	    </div>
	);
    }
}));

export default Card;

// {this.props.mainStore.tracksDefinitions.map(p => {
// console.log(p.message);
// if(p._id == this.props.id){
// 	console.log(p);
// 	// p.message.map(t => {
// 	//     <p key={t._id}>{t.task}</p>
// 	// });
// }
// return <p key={t._id}>{t._id}</p>
// })}
