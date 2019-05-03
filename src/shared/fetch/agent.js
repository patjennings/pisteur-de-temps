import axios from "axios";
import {getUserName, getClientName} from "utils/defsConverter";
import {getFullTime, getPercent} from 'utils/budget';

const API_ROOT = "http://localhost:3000";


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

// --------------------
// Personal history
// --------------------
export function fetchPersonalHistory(userId){
    let result = axios
	.get(`${API_ROOT}/users/${userId}/trackedtime`)
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
