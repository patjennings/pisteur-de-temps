import { observable, computed, action, decorate, configure, runInAction, toJS, get, trace } from "mobx";
import * as agent from "fetch/agent";

import authStore from "stores/authStore";

import Strings from "localisation/Strings";

configure({ enforceActions: "observed" });

export class MainStore{
    constructor(){
	this.pageDisplayed = "dashboard";
	
	this.isLoading = false;
	this.isLoadingProject = false;

	this.unit = "hour";
	this.lang = "fr";

	this.appStrings = Strings();

	this.showProject = false; // un projet est-il affiché ?
	this.activeProject = null; // le projet actif
	this.activeTaskInput = null; // la tâche en train d'être entrée

	this.loadParameters();
	this.loadDefinitions();
	// this.loadTracks();

	this.clientsDefinitions = []; // définitions des clients
	this.projectsDefinitions = []; // ... des projets
	this.usersDefinitions = []; // ... des users
	this.tracksDefinitions = []; // ... des users

	this.activeTrackedTime = [];
	this.activeProjectDetails = {};

	// this.allTracks = [];
	this.trackHistory = []; // historique des tracks du user

	this.state = "pending";
    }

    setActiveTaskInput(value){
	this.activeTaskInput = value;
    }
    setActiveProject(value){
	// console.log("new active project is "+ value);
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

    loadParameters(){
	agent.fetchParameters()
	    .then(action((parameters) => {
		// console.log(parameters);
		// console.log(history);
		this.unit = parameters.find(item => item._id == "unit").value;
		this.lang = parameters.find(item => item._id == "lang").value;
	    }))
	// .catch(action((error) => {
	// 	console.log(error);
	// }))
	    .finally(action(() => { this.isLoading = false; }))
    }
    updateParameters(paramId, value){
	agent.parametersUpdate(paramId, value)
	    .then(action(() => {
		this.loadParameters();
		// console.log("param updated");
		// this.loadPersonalHistory() // relance le chargement de l'historique perso
		// this.loadProject(projectId) // relance le chargement du projet
		// this.loadTrackedTime(projectId) // et on relance le trackingtime du projet
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	// .finally(action(() => { this.isLoading = false; }));
    }
    
    loadPersonalHistory(){
	// console.log("loading personal history…");
	// console.log(authStore.userId);
	// this.isLoading = true;
	
	agent.fetchPersonalHistory(authStore.userId)
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
	// console.log("project is loading...");
	this.isLoadingProject = true;
	// console.log(id);
	agent.fetchProject(id)
	    .then(action((project) => {
		// console.log(project.data);
		this.activeProjectDetails = project.data;
	    }))
	    .catch(action((error) => {
	    	console.log(error);
	    }))
	    .finally(action(() => { this.isLoadingProject = false; }));
    }

    loadTrackedTime(id){
	this.isLoadingProject = true;

	agent.fetchProjectTrackedTime(id)
	    .then(action((tracked) => {
		this.activeTrackedTime = tracked.data.message
	    }))
	    .catch(action((error) => {
	    	console.log(error);
	    }))
	    .finally(action(() => { this.isLoadingProject = false; }));
    }

    // getTrackLengthForProject(){
    // 	return "ok";
    // 	// console.log(this.projectsDefinitions);
    // 	// this.projectsDefinitions.forEach(p => {
    // 	//     console.log("(((())))"+p._id);
    // 	//     const node = this.projectsDefinitions.filter(
    // 	// 	n => {return n._id == p._id;}
    // 	//     );
    // 	//     console.log(this.projectsDefinitions[0]);
    // 	//     agent.fetchProjectTrackedTime(p._id)
    // 	// 	.then(action((tracked) => {
    // 	// 	    // console.log(node);
    // 	// 	    console.log(tracked.data.message.length);
    // 	// 	    node.tracks = tracked.data.message.length
    // 	// 	}))
    // 	// 	.catch(action((error) => {
    // 	//     	    console.log(error);
    // 	// 	}))
    // 	// 	.finally(action(() => { this.isLoadingProject = false; }));
    // 	// })
    // 	// agent.loadTrackedTime(p._id)
    // }
    
    loadDefinitions(){
	// this.isLoading = true;
	// console.log("ça recharge les defs !!!!!!!!!!!!");

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
		this.loadTracks(projects);
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

    loadTracks(projects){
	agent.fetchTracksDefinitions(projects)
	    .then(action((tracks) => {
		this.tracksDefinitions = tracks;
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	    .finally(action(() => {
		console.log("fetch tracks over")
	    }))
    }


    // tasks
    postNewTask(projectId, formData){
	agent.taskNew(projectId, formData)
	    .then(action(() => {
		this.loadPersonalHistory() // relance le chargement de l'historique perso
		this.loadProject(projectId) // relance le chargement du projet
		this.loadTrackedTime(projectId) // et on relance le trackingtime du projet
		this.loadDefinitions();
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
    deleteClient(clientId){
	agent.clientDelete(clientId)
	    .then(action(() => {
		this.loadDefinitions();
		// this.loadPersonalHistory() // relance le chargement de l'historique perso
		// this.loadProject(projectId) // relance le chargement du projet
		// this.loadTrackedTime(projectId) // et on relance le trackingtime du projet 
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	// .finally(action(() => { this.isLoading = false; }));
    }
    updateClient(clientId, formData){
	agent.clientUpdate(clientId, formData)
	    .then(action(() => {
		console.log("update client");
		// this.loadPersonalHistory() // relance le chargement de l'historique perso
		this.loadDefinitions();
		// this.loadProject(projectId) // relance le chargement du projet
		// this.loadTrackedTime(projectId) // et on relance le trackingtime du projet
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	// .finally(action(() => { this.isLoading = false; }));
    }

    //user
    updateUser(userId, formData, reloadActiveUser){
	console.log(userId);
	agent.userUpdate(userId, formData)
	    .then(action(() => {
		console.log("update user");
		// this.loadPersonalHistory() // relance le chargement de l'historique perso
		this.loadDefinitions();
		reloadActiveUser && authStore.getUserData(userId);
		
		// this.loadProject(projectId) // relance le chargement du projet
		// this.loadTrackedTime(projectId) // et on relance le trackingtime du projet
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
		this.loadDefinitions(); 
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	// .finally(action(() => { this.isLoading = false; }));
    }
    updateProject(projectid, formData){
	agent.projectUpdate(projectid, formData)
	    .then(action(() => {
		this.loadDefinitions(); 
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	// .finally(action(() => { this.isLoading = false; }));
    }
    deleteTaskInProject(projectid, taskToDelete){
	agent.projectDeleteTask(projectid, taskToDelete)
	    .then(action(() => {
		this.loadDefinitions(); 
	    }))
	    .catch(action((error) => {
		console.log(error);
	    }))
	// .finally(action(() => { this.isLoading = false; }));
    }
    deleteProject(projectid){
	// console.log("delete proj");
	agent.projectDelete(projectid)
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
    isLoading: observable,
    isLoadingProject: observable,
    appStrings: observable,
    unit: observable,
    lang: observable,
    showProject: observable,
    getTrackNumbersForProject: action,
    activeProject: observable,
    activeTaskInput: observable,
    activeTrackedTime: observable,
    activeProjectDetails: observable,
    clientsDefinitions: observable,
    projectsDefinitions: observable,
    usersDefinitions: observable,
    tracksDefinitions: observable,
    trackHistory: observable,
    state: observable,
    setPageDisplayed: action,
    setActiveTaskInput: action,
    setActiveProject: action,
    setShowProject: action,
    loadPersonalHistory: action,
    loadProject: action,
    loadTrackedTime: action,
    loadDefinitions: action,
    loadParameters: action,
    updateParameters: action,
    loadTracks: action,
    postNewTask: action,
    postNewClient: action,
    deleteClient: action,
    updateClient: action,
    updateUser: action,
    postNewProject: action,
    updateProject: action,
    deleteTaskInProject: action,
    deleteProject: action,
    updateTask: action,
    deleteTask: action
});


export default new MainStore();
