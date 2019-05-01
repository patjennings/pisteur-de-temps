import { observable, computed, action, decorate, configure, runInAction, toJS, get } from "mobx";
// import { observer } from "mobx-react";
import Definitions from "fetch/definitions";

configure({ enforceActions: "observed" });

let defs = new Definitions();

export class MainStore{
    constructor(){
	// this.data = {
	//     userId: "5c9b3912f787951b7e8c9d62",
	//     showProject: false,
	//     activeProject: null,
	//     definitions: this.getDefs()
	// }
	this.isLoading = false;
	this.userId = "5c9b3912f787951b7e8c9d62"
	this.showProject = false
	this.activeProject = null
	
	this.clientsDefinitions = []
	this.projectsDefinitions = []
	this.usersDefinitions = []

	this.state = "pending"
	
	// this.loadDefinitions();
    }

    loadDefinitions(){
	this.isLoading = true
	defs.getDefinitions()
	    .then(action((parts) => {
		this.clientsDefinitions = parts.clientsDefinitions;
		this.projectsDefinitions = parts.projectsDefinitions;
		this.usersDefinitions = parts.usersDefinitions;
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	    .finally(action(() => { this.isLoading = false; }));
    }

    setActiveProject(value){
	this.activeProject = value;
    }
    setShowProject(value){
	this.showProject = value;
    }
}

decorate(MainStore, {
    isLoading: observable,
    userId: observable,
    showProject: observable,
    activeProject: observable,
    clientsDefinitions: observable,
    projectsDefinitions: observable,
    usersDefinitions: observable,
    state: observable,
    loadDefinitions: action,
    setActiveProject: action,
    setShowProject: action
});


export default new MainStore();
