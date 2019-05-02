import axios from "axios";
import {getUserName, getClientName} from "utils/defsConverter";
import {getFullTime, getPercent} from 'utils/budget';

const API_ROOT = "http://localhost:3000";

// export async function getDefinitions(){
//     let definitions = {
// 	clientsDefinitions: null,
// 	projectsDefinitions: null,
// 	usersDefinitions: null
//     };
    
//     const clientsDefs = await axios.get(`${API_ROOT}/clients`);
//     const projectsDefs = await axios.get(`${API_ROOT}/projects`);
//     const usersDefs = await axios.get(`${API_ROOT}/users`);

//     definitions.clientsDefinitions = clientsDefs.data;
//     definitions.projectsDefinitions = projectsDefs.data;
//     definitions.usersDefinitions = usersDefs.data;

//     return definitions;
// }


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
    console.log(body);
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

export async function fetchProject(projectId, definitions){
    let result = {};
    const getProject = await axios.get(`$API_ROOT/projects/${projectId}`);
    const getTrackedTime = await axios.get(`$API_ROOT/projects/${projectId}/trackedtime`);
    
    const trackedList = getTrackedTime.data.message.map(t => {
    	return {
    	    id: t._id,
    	    task: t.task,
    	    value: t.value,
    	    comment: t.comment,
    	    relatedProject: t.relatedProject,
    	    username: getUserName(definitions, t.relatedUser),
    	    date: t.dateCreation
    	};
	
    });
    
    result = {
    	projectName: getProject.data.name,
    	projectDescription: getProject.data.description,
    	projectBudget: getProject.data.budget,
    	clientId: getProject.data.client,
    	clientName: getClientName(definitions, getProject.data.client),
    	trackedTime: trackedList,
    	fullTime: getFullTime(getTrackedTime.data.message)
    };
    
    return result;
}


