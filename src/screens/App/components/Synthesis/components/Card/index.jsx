import React, { Component } from 'react';
import {observer, inject} from "mobx-react";

import {toJS} from "mobx";

import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';
import {getFullTime, getPercent} from 'utils/budget';

const Card = inject("mainStore")(observer(class Card extends Component {
    constructor(props){
	super(props);
	this.listProjectsTasks = this.listProjectsTasks.bind(this);

	this.state = {
	    timeSpent: 0,
	    timeTotal: this.props.budget,
	    timeOverflow: false,
	    tasks: {}
	};
    }

    componentDidMount(){
	
    }
    componentDidUpdate(){
	this.state.timeSpent = 0;
	// this.state.tasks = this.listProjectsTasks();
	// this.state.timeOverflow = false;
    }
    listProjectsTasks(){
	let res = {};
	
	this.props.mainStore.tracksDefinitions.map(t => {
	    if(t._id == this.props.id){
		console.log(toJS(t.message));
		t.message.map(m => {
		    if(res[m.task] !== undefined){
		    	res[m.task] += m.value;
		    } else {
		    	let task = {[m.task] : m.value};
		    	Object.assign(res, task);
		    }
		    this.state.timeSpent += m.value;
		});
	    }
	});

	if(this.state.timeSpent > this.state.timeTotal){
	    this.state.timeTotal = this.state.timeSpent;
	    this.state.timeOverflow = true;
	} else {
	    this.state.timeTotal = this.props.budget;
	    this.state.timeOverflow = false;
	}

	return res;
    }
    render() {
	// const tasks = this.listProjectsTasks();
	this.state.tasks = this.listProjectsTasks();
	
	return (
	    <div className={"synthesis-card card "+(this.state.timeOverflow ? "time-overflow" : "")}>
	      <div className="card-header">
		<div className="row">
		  <div className="col-md-8">
		    <p className="synthesis-card--client">{getClientName(this.props.mainStore.clientsDefinitions, this.props.client)}</p>
		    <h6 className="synthesis-card--name">{this.props.name}</h6>
		    <p className="synthesis-card--description">{this.props.description}</p>
		  </div>
		  <div className="col-md-4">
		    <p className="synthesis-card--spent">{this.state.timeSpent} <span className="budget-unit">jours</span></p>
		    <p className="synthesis-card--budget">sur {this.props.budget} <span className="budget-unit"></span></p>
		  </div>
		</div>
	      </div>
	      <div className="card-body">
		{Object.keys(this.state.tasks).map(t => {
		    // offset += this.getProjectPercentage(this.state.tasks[t]);
		    return <div className="row">
			<div className="col-md-6">
			      <div className="task-progress">
				    
				    <div className="progress">
					  <div className="progress-bar" role="progressbar" style={{width: getPercent(this.state.tasks[t], this.state.timeTotal, true)+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
					</div>
				  </div>
			    </div>
		            <div className="col-md-6">
				  <div className="task-name"><span className="badge task-percentage mr-2">{getPercent(this.state.tasks[t], this.state.timeTotal, true)+"%"}</span>{t}<span className="task-spent">{this.state.tasks[t]} jours</span></div>
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
