import { observable, computed, action, decorate, configure, runInAction, toJS, get, trace } from "mobx";
import * as agent from "fetch/agent";

configure({ enforceActions: "observed" });

export class MainStore{
    constructor(){
	this.pageDisplayed = "dashboard";

	this.isLoggedIn = true;
	this.userId = "5c9b3912f787951b7e8c9d62"; // l'utilisateur actif
	
	this.isLoading = false;
	this.isLoadingProject = false;

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


    setActiveProject(value){
	console.log("new active project is "+ value);
	this.loadProject(value);
	this.loadTrackedTime(value);
	this.activeProject = value;
    }
    setShowProject(value){
	this.showProject = value;
    }
    setPageDisplayed(value){
	this.pageDisplayed = value;
    }


    loadPersonalHistory(){
	console.log("loading personal history…");
	// this.isLoading = true;
	
	agent.fetchPersonalHistory(this.userId)
	    .then(action((history) => {
		// console.log(history);
		this.trackHistory = history;
	    }))
	// .catch(action((error) => {
	// 	console.log(error);
	// }))
	    .finally(action(() => { this.isLoading = false; }));
	
    }

    loadProject(id){
	console.log("project is loading...");
	this.isLoadingProject = true;
	// console.log(id);
	agent.fetchProject(id)
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
	agent.fetchProjectTrackedTime(id)
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

	agent.fetchClientsDefinitions()
	    .then(action((clients) => {
		this.clientsDefinitions = clients;
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	    .finally(action(() => {
		console.log("fetch clients over")
	    }))
	agent.fetchProjectsDefinitions()
	    .then(action((projects) => {
		this.projectsDefinitions = projects;
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	    .finally(action(() => {
		console.log("fetch projects over")
	    }))
	agent.fetchUsersDefinitions()
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

   


    // tasks
    postNewTask(projectId, formData){
	agent.taskNew(projectId, formData)
	    .then(action(() => {
		this.loadPersonalHistory() // relance le chargement de l'historique perso
		this.loadProject(projectId) // relance le chargement du projet
		this.loadTrackedTime(projectId) // et on relance le trackingtime du projet
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	// .finally(action(() => { this.isLoading = false; }));
    }
    deleteTask(projectId, trackId){
	agent.taskDelete(projectId, trackId)
	    .then(action(() => {
		this.loadPersonalHistory() // relance le chargement de l'historique perso
		this.loadProject(projectId) // relance le chargement du projet
		this.loadTrackedTime(projectId) // et on relance le trackingtime du projet 
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	// .finally(action(() => { this.isLoading = false; }));
    }
    updateTask(projectId, trackId, formData){
	agent.taskUpdate(projectId, trackId, formData)
	    .then(action(() => {
		this.loadPersonalHistory() // relance le chargement de l'historique perso
		this.loadProject(projectId) // relance le chargement du projet
		this.loadTrackedTime(projectId) // et on relance le trackingtime du projet
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	// .finally(action(() => { this.isLoading = false; }));
    }

    // clients
    postNewClient(formData){
	agent.clientNew(formData)
	    .then(action(() => {
		this.loadDefinitions(); 
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	// .finally(action(() => { this.isLoading = false; }));
    }

    // project
    postNewProject(formData){
	agent.projectNew(formData)
	    .then(action(() => {
		// console.log(formData);
		this.loadDefinitions(); 
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	// .finally(action(() => { this.isLoading = false; }));
    }
}

decorate(MainStore, {
    pageDisplayed: observable,
    isLoggedIn: observable,
    userId: observable,
    isLoading: observable,
    isLoadingProject: observable,
    showProject: observable,
    activeProject: observable,
    activeTrackedTime: observable,
    activeProjectDetails: observable,
    clientsDefinitions: observable,
    projectsDefinitions: observable,
    usersDefinitions: observable,
    trackHistory: observable,
    state: observable,
    setPageDisplayed: action,
    setActiveProject: action,
    setShowProject: action,
    loadPersonalHistory: action,
    loadProject: action,
    loadTrackedTime: action,
    loadDefinitions: action,
    postNewTask: action,
    postNewClient: action,
    postNewProject: action,
    updateTask: action,
    deleteTask: action
});


export default new MainStore();
