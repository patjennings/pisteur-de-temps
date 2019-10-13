import React, { Component } from 'react';
import {observer, inject} from "mobx-react";
import Project from "./components/Project";
import AddProject from "../AddProject";


import {getUserName, getProjectName, getClientName} from 'utils/defsConverter';

import "assets/styles/main.scss";

const ProjectsManager = inject("mainStore", "authStore")(observer(class ProjectsManager extends Component {
    constructor(props){
	super(props);
	this.state = {
	    isAddingProject: false,
	    search: '',
	    height: window.innerHeight - 420
	};
	this.addProject = this.addProject.bind(this);
	this.handleChange = this.handleChange.bind(this);
	this.handleResize = this.handleResize.bind(this);
	this.changeOrder = this.changeOrder.bind(this);
    }
    changeOrder(){
	console.log("sort !");
    }
    addProject(){
	this.setState({isAddingProject: true});
    }
handleResize(){
	this.setState({
	    height: window.innerHeight - 420
	})
    }
    handleChange(e){
	this.setState({isAddingProject: false});
	this.setState({
	    search: e.target.value
	});

    }
    render() {
	return (
	    <div>
	      <div className="projects-header pane-header">
		<div className="actions">
		  
		  <div className="row">
		    <div className="col-4">
		      <input className="form-control"
  			     name="search"
  			     id={"user-input--name"}
  			     type="text"
  			     aria-label="Input"
			     placeholder="Search"
			     onChange={this.handleChange}/>
		    </div>
		    <div className="col-5">
		      <div className="btn-group">
			<button type="button" className="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			  Filter
			</button>
			<div className="dropdown-menu">
			  <a className="dropdown-item" href="#" onClick={this.changeOrder} sort="name">Name</a>
			  <a className="dropdown-item" href="#" onClick={this.changeOrder} sort="date">Date added</a>
			  <a className="dropdown-item" href="#" onClick={this.changeOrder} sort="role">Role</a>
			</div>
		      </div>
		    </div>
		    <div className="col-3">
		      <button className="btn btn-primary float-right" type="button" onClick={this.addProject}><i className="ico">plus</i>&nbsp;Add a project</button>
		    </div>
		  </div>
		  
		  
		  
		</div>
		<div className="column-name">
		  <div className="row">
		    <div className="col-2">
		      Client
		    </div>
		    <div className="col-4">
		      Project & description
		    </div>
		    <div className="col-2">
		      Budget
		    </div>
		    <div className="col-4">
		      Tasks
		    </div>
		  </div>
		</div>
	      </div>
	      <div className="projects-content pane-content" style={{height: this.state.height+"px"}}>
		<ul>
		  { this.state.isAddingProject ? <li className="new"><AddProject onChange={this.handleChange} /></li>: null }
		  {this.props.mainStore.projectsDefinitions.map(p => {
		      const pn = getProjectName(this.props.mainStore.projectsDefinitions, p._id);
		      const pnNoAccent = pn.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		      const cn = getClientName(this.props.mainStore.clientsDefinitions, p.client);
		      const cnNoAccent = cn.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		      
		      const srProject = pn.search(new RegExp(this.state.search, "i")); // On checke si on affiche ou pas en fonction du champ de recherche sur le composant parent
		      const srProjectNoAccent = pnNoAccent.search(new RegExp(this.state.search, "i")); // On checke si on affiche ou pas en fonction du champ de recherche sur le composant parent
		      const srClient = cn.search(new RegExp(this.state.search, "i")); // On checke si on affiche ou pas en fonction du champ de recherche sur le composant parent
		      const srClientNoAccent = cnNoAccent.search(new RegExp(this.state.search, "i")); // On checke si on affiche ou pas en fonction du champ de recherche sur le composant parent

		      console.log(srProjectNoAccent);
		      
		      // console.log(sr);
		      if(srProject !== -1 || srClient !== -1 || srProjectNoAccent !== -1 || srClientNoAccent !== -1){
			  return <Project key={p._id} projectid={p._id} clientid={p.client} description={p.description} budget={p.budget} hasTracks={p.hasTracks} tasks={p.tasks} currentSearch={this.state.search}/>
		      }
			  
			      }
			  )}
                </ul>
	      </div>
            </div>
	);
    }
}));

export default ProjectsManager;


		
