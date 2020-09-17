import axios from "axios";
import {getUserName, getClientName} from "utils/defsConverter";
import {getFullTime, getPercent} from 'utils/budget';
import Config from "Config";

const API_ROOT = Config.app.apiUrl;

// --------------------
// Login
// --------------------
export function login(em, pwd, isCk){
    let result = axios
	.post(`${API_ROOT}/login`, null, {params: {
	    email : em,
	    password : pwd,
	    isCookie : isCk
	}})
	.then(res => {
	    console.log(res);
	    return res.data

	})
	.catch(error => console.log(error));
    return result;
}

// --------------------
// lost, reset password
// --------------------
export function lostPassword(em, ip){
    let result = axios
	.post(`${API_ROOT}/lost-password`, null, {params: {
	    email : em,
	    ip: ip
	}})
	.then(res => {
	    console.log(res);
	    return res.data
	})
	.catch(error => console.log(error));
    return result;
}

export function resetPassword(newpass, key){
    let result = axios
	.post(`${API_ROOT}/reset-password`, null, {params: {
	    newpassword : newpass,
	    key : key
	}})
	.then(res => {
	    console.log(res);
	    return res.data
	})
	.catch(error => console.log(error));
    return result;
}


// --------------------
// Params
// --------------------
export function fetchParameters(){
    let result = axios
	.get(`${API_ROOT}/params`)
	.then(res => {
	    return res.data
	})
	.catch(error => console.log(error));
    return result;
}
export function parametersUpdate(id, value){
    const body = {"value": value};
    let result = axios
	.put(`${API_ROOT}/params/${id}`, body)
	.then(res => {
	    result = res
	})
	.catch(error => {
	    result = error
	});
    return result;
}

// --------------------
// Definitions
// --------------------
 export function fetchClientsDefinitions(){
    let result = axios
	.get(`${API_ROOT}/clients`)
	.then(res => {
	    return res.data
	    // console.log(res.data);
	})
	.catch(error => console.log(error));
    return result;
}
export function fetchProjectsDefinitions(){
    let result = axios
	.get(`${API_ROOT}/projects`)
	.then(res => {
	    return res.data
	})
	.catch(error => console.log(error));
    return result;
}
export function fetchUsersDefinitions(){
    let result = axios
	.get(`${API_ROOT}/users`)
	.then(res => {
	    return res.data
	})
	.catch(error => console.log(error));
    return result;
}
export async function fetchTracksDefinitions(projects){
    // console.log(ids);
    let arr = [];

    projects.forEach((p) => {
	let id = p._id;
	arr.push(axios
		 .get(`${API_ROOT}/projects/${id}/trackedTime`)
		 .then(res => {
		     const tracksId = {
			 _id : id
		     }
		     const tracksData = res.data
		     const r = {...tracksData, ...tracksId}
		     return r
		 })
		);
    });
    
    let result = await axios.all(arr);
    return result;

    // let result = await axios.all(arr);
    // console.log(res);
    
    //     projects.forEach((p) => {
    //     	let id = p._id;

    //     	// return ids;
    //     	let result = axios.all(`${API_ROOT}/projects/${id}/trackedTime`)
    //     	    .then(res => {
    // 		console.log(res.data);
    //     		resultGlobal += res.data

    //     	    })
    //     	    .catch(error => console.log(error));
    
    //     })
    //     console.log(resultGlobal);
    //     return resultGlobal;
}

// --------------------
// User
// --------------------
export function fetchUser(id){
    let result = axios
	.get(`${API_ROOT}/user/${id}`)
	.then(res => {
	    return res
	})
	.catch(error => console.log(error));
    return result;
}

export function userUpdate(id, body){
    body = {...body};
    let result = axios
	.put(`${API_ROOT}/user/${id}`, body)
	.then(res => {
	    result = res
	})
	.catch(error => {
	    result = error
	});
    return result;
}

// --------------------
// Cookie
// --------------------
export function controlCookie(key, ip){
    let result = axios
	.get(`${API_ROOT}/cookie?key=${key}&ip=${ip}`)
	.then(res => {
	    return res
	})
	.catch(error => console.log(error));
    return result;
}


// --------------------
// Personal history
// --------------------
export function fetchPersonalHistory(userId){
    let result = axios
	.get(`${API_ROOT}/user/${userId}/trackedtime`)
	.then(response => {
	    const fetch = response.data.message.map(t => {
    		return {
    		    id: t._id,
    		    task: t.task,
    		    value: t.value,
    		    comment: t.comment,
    		    relatedProject: t.relatedProject,
    		    date: t.dateCreation
    		};
    	    });
	    return fetch
	})
	.catch(error => console.log(error));
    return result;
}


// --------------------
// Project
// --------------------
export function fetchProject(projectId){
    let result = axios
	.get(`${API_ROOT}/projects/${projectId}`)
	.then(res => {
	    return res  
	});
    return result;
}

export function fetchProjectTrackedTime(projectId){
    let result = axios
	.get(`${API_ROOT}/projects/${projectId}/trackedtime`)
	.then(res => {
	    return res  
	});

    return result;
}

// --------------------------

export function projectNew(body){
    let result = axios
	.post(`${API_ROOT}/projects/`, {
	    name: body.name,
	    client: body.client,
	    description: body.description,
	    budget: body.budget
	})
	.then(res => {
	    result = res
	})
	.catch(error => {
	    result = error
	});
    
    return result;
}
export function projectUpdate(projectId, body){
    body = {...body};
    let result = axios
	.put(`${API_ROOT}/projects/${projectId}`, body)
	.then(res => {
	    result = res
	})
	.catch(error => {
	    result = error
	});
    
    return result;
}
export function projectDeleteTask(projectId, task){
    let result = axios
	.put(`${API_ROOT}/projects/${projectId}?removeTask=${task}`)
	.then(res => {
	    result = res
	})
	.catch(error => {
	    result = error
	});
    
    return result;
}
export function projectDelete(projectId){
    let result = axios.delete(`${API_ROOT}/projects/${projectId}`)
	.then(res => {
	    result = res;
	})
	.catch(error => {
	    result = error
	});
    
    return result;
}

// --------------------
// Tasks
// --------------------
export function taskNew(projectId, body){
    let result = axios
	.post(`${API_ROOT}/projects/${projectId}/trackedTime`, {
	    task: body.task,
	    comment: body.comment,
	    value: body.value,
	    user: body.user
	})
	.then(res => {
	    result = res
	})
	.catch(error => {
	    result = error
	});
    
    return result;
}
export function taskUpdate(projectId, taskid, body){
    body = {...body, project: projectId}
    let result = axios
	.put(`${API_ROOT}/projects/${projectId}/trackedtime/${taskid}`, body)
	.then(res => {
	    result = res
	})
	.catch(error => {
	    result = error
	});
    
    return result;
}
export function taskDelete(projectId, trackId){
    let result = axios.delete(`${API_ROOT}/projects/${projectId}/trackedtime/${trackId}`)
	.then(res => {
	    result = res;
	})
	.catch(error => {
	    result = error
	});
    
    return result;
}


// --------------------
// Clients
// --------------------
export function clientNew(body){
    let result = axios
	.post(`${API_ROOT}/clients/`, {
	    name: body.name
	})
	.then(res => {
	    result = res
	})
	.catch(error => {
	    result = error
	});
    
    return result;
}
export function clientUpdate(clientId, body){
    body = {...body};
    let result = axios
	.put(`${API_ROOT}/clients/${clientId}`, body)
	.then(res => {
	    result = res
	})
	.catch(error => {
	    result = error
	});
    
    return result;
}
export function clientDelete(clientId){
    let result = axios.delete(`${API_ROOT}/clients/${clientId}`)
	.then(res => {
	    result = res;
	})
	.catch(error => {
	    result = error
	});
    
    return result;
}
