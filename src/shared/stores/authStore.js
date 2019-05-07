import { observable, computed, action, decorate, configure, runInAction, toJS, get, trace } from "mobx";
import * as agent from "fetch/agent";
// import {validateLoginKey} from "../../../server/utils/validation";

configure({ enforceActions: "observed" });

export class AuthStore{
    constructor(){
	this.isLoggedIn = false;
	this.userId = null; // l'utilisateur actif
    }

    checkLogged(){
	// get if there is already a cookie
	     // no return false
	// yes : get ip and key from the cookie
	// get if this matchs to something in the db
	    // no return false
	// yes : retrieve email + password
	// launch logToApp with these
    }

    logToApp(formData){
	console.log(`try to log with ${formData.username} and ${formData.password}`);
	agent
	    .login(formData.username, formData.password)
	    .then(action((res) => {
		if(res.error === true){
		    console.log("error while connecting");
		} else {
		    this.userId = res.userId;
		    this.isLoggedIn = true;
		} 
	    }))
    }
}

decorate(AuthStore, {
    isLoggedIn: observable,
    userId: observable,
    logToApp: action
});


export default new AuthStore();
