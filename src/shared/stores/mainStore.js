import { observable, computed, action, decorate, configure, runInAction, toJS, get } from "mobx";
import {fetchClientsDefinitions,fetchProjectsDefinitions,fetchUsersDefinitions, fetchPersonalHistory, taskNew, taskDelete, taskUpdate} from "fetch/agent";

configure({ enforceActions: "observed" });

export class MainStore{
    constructor(){
	this.isLoading = false;
	this.userId = "5c9b3912f787951b7e8c9d62";
	this.showProject = false;
	this.activeProject = null;
	
	// this.loadPersonalHistory();
	this.loadDefinitions();

	this.clientsDefinitions = [];
	this.projectsDefinitions = [];
	this.usersDefinitions = [];
	
	this.trackHistory = [];

	this.state = "pending";
    }

    loadPersonalHistory(){
	console.log("loading personal history…");
	// this.isLoading = true;
	
	fetchPersonalHistory(this.userId)
	    .then(action((history) => {
		// console.log(history);
		this.trackHistory = history
	    }))
	    // .catch(action((error) => {
	    // 	console.log(error);
	    // }))
	    // .finally(action(() => { this.isLoading = false; }));
	
    }

    loadDefinitions(){
	// this.isLoading = true;

	fetchClientsDefinitions()
	    .then(action((clients) => {
		this.clientsDefinitions = clients;
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	    .finally(action(() => {
		console.log("fetch clients over")
	    }))
	fetchProjectsDefinitions()
	    .then(action((projects) => {
		this.projectsDefinitions = projects;
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	    .finally(action(() => {
		console.log("fetch projects over")
	    }))
	fetchUsersDefinitions()
	    .then(action((users) => {
		this.usersDefinitions = users;
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	    .finally(action(() => {
		console.log("fetch users over")
	    }))
    }

    setActiveProject(value){
	this.activeProject = value;
    }
    setShowProject(value){
	this.showProject = value;
    }

    postNewTask(projectId, formData){
	taskNew(projectId, formData)
	    .then(action(() => {
		this.loadPersonalHistory()
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	// .finally(action(() => { this.isLoading = false; }));
    }
    deleteTask(projectId, trackId){
	taskDelete(projectId, trackId)
	    .then(action(() => {
		this.loadPersonalHistory()
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	// .finally(action(() => { this.isLoading = false; }));
    }
    updateTask(projectId, trackId, formData){
	taskUpdate(projectId, trackId, formData)
	    .then(action(() => {
		this.loadPersonalHistory()
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	// .finally(action(() => { this.isLoading = false; }));
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
    trackHistory: observable,
    state: observable,
    loadPersonalHistory: action,
    loadDefinitions: action,
    setActiveProject: action,
    setShowProject: action,
    postNewTask: action,
    updateTask: action,
    deleteTask: action
});


export default new MainStore();
