import axios from "axios";
import {getUserName, getClientName} from "utils/defsConverter";
import {getFullTime, getPercent} from 'utils/budget';

export default async function fetchProject(projectId, definitions){
    let result = {};
    const getProject = await axios.get("http://localhost:3000/projects/"+projectId);
    const getTrackedTime = await axios.get("http://localhost:3000/projects/"+projectId+"/trackedtime");
    
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


