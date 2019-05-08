import { observable, computed, action, decorate, configure, runInAction, toJS, get, trace } from "mobx";
import * as agent from "fetch/agent";
import Cookies from 'universal-cookie';

configure({ enforceActions: "observed" });

export class AuthStore{
    constructor(){
	this.isLoading = false;
	this.hasErrors = false;
	this.isLoggedIn = false;
	this.userId = localStorage.id; // l'utilisateur actif
	this.user = {};
	this.sessionSecret = "g45aze84IHJzf49Ozfrz5FE";

	// on lance des actions si on a un userId
	this.userId !== undefined && this.getUserData(this.userId);
	this.checkLogged();

	this.logToApp = this.logToApp.bind(this);
    }

    checkLogged(){
	const cookies = new Cookies();
	const ck = cookies.get('login');
	// this.isLoading = true;

	agent
	    .controlCookie(ck, "::ffff:127.0.0.1")
	    .then(action((res) => {
		console.log(res);
		res.data.cookie == true ? console.log("cookie active") : console.log("no active cookie");

		this.hasErrors = false;
		this.userId = res.data.data._id;
		this.isLoggedIn = true;
		this.getUserData(res.data.data._id);

		this.isLoading = false;
	    }))
    }

    logout(){
	this.isLoggedIn = false;
	this.userId = false;
	localStorage.clear();
    }

    getUserData(uid){
	this.isLoading = true;
	console.log("fetch user data");
	agent
	    .fetchUser(uid)
	    .then(action((res) => {
		this.user = res.data;
		this.isLoading = false;
	    }))
    }

    logToApp(username, password, isCookieActive){
	console.log(`try to log with ${username} and ${password}`);
	this.isLoading = true;
	agent
	    .login(username, password, isCookieActive)
	    .then(action((res) => {
		if(res.error === true){
		    console.log("error while connecting");
		    this.hasErrors = true;
		} else {
		    this.hasErrors = false;
		    this.userId = res.userId;
		    this.isLoggedIn = true;
		    this.getUserData(res.userId);

		    localStorage.setItem("secret", this.sessionSecret);
		    localStorage.setItem("id", this.userId);

		    this.isLoading = false;
		} 
	    }))
    }
}

decorate(AuthStore, {
    isLoading: observable,
    hasErrors: observable,
    isLoggedIn: observable,
    userId: observable,
    user: observable,
    sessionSecret: observable,
    checkLogged: action,
    logout: action,
    logToApp: action
});


export default new AuthStore();
