import { observable, computed, action, decorate, configure, runInAction, toJS, get, trace } from "mobx";
import {fetchClientsDefinitions,fetchProjectsDefinitions,fetchUsersDefinitions, fetchPersonalHistory, fetchProject, fetchProjectTrackedTime, taskNew, taskDelete, taskUpdate} from "fetch/agent";

configure({ enforceActions: "observed" });

export class MainStore{


    constructor(){
	this.isLoading = false;
	this.isLoadingProject = false;
	this.userId = "5c9b3912f787951b7e8c9d62"; // l'utilisateur actif
	this.showProject = false; // un projet est-il affiché ?
	this.activeProject = null; // le projet actif
	
	this.loadDefinitions();

	this.clientsDefinitions = []; // définitions des clients
	this.projectsDefinitions = []; // ... des projets
	this.usersDefinitions = []; // ... des users

	this.activeTrackedTime = [];
	this.activeProjectDetails = {};
	
	this.trackHistory = []; // historique des tracks du user

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
	    .finally(action(() => { this.isLoading = false; }));
	
    }

    loadProject(id){
	this.isLoadingProject = true;
	// console.log(id);
	fetchProject(id)
	    .then(action((project) => {
		console.log(project.data);
		this.activeProjectDetails = project.data;
	    }))
	    .catch(action((error) => {
	    	console.log(error);
	    }))
	    .finally(action(() => { this.isLoadingProject = false; }));
    }

    loadTrackedTime(id){
	this.isLoadingProject = true;
	// console.log(id);
	fetchProjectTrackedTime(id)
	    .then(action((tracked) => {
		this.activeTrackedTime = tracked.data.message
	    }))
	    .catch(action((error) => {
	    	console.log(error);
	    }))
	    .finally(action(() => { this.isLoadingProject = false; }));
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
	console.log("new active project is "+ value);
	this.loadProject(value);
	this.loadTrackedTime(value);
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
    isLoadingProject: observable,
    userId: observable,
    showProject: observable,
    activeProject: observable,
    activeTrackedTime: observable,
    activeProjectDetails: observable,
    clientsDefinitions: observable,
    projectsDefinitions: observable,
    usersDefinitions: observable,
    trackHistory: observable,
    state: observable,
    loadPersonalHistory: action,
    loadProject: action,
    loadTrackedTime: action,
    loadDefinitions: action,
    setActiveProject: action,
    setShowProject: action,
    postNewTask: action,
    updateTask: action,
    deleteTask: action
});


export default new MainStore();
