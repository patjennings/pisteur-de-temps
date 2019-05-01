import axios from "axios";

export default function updateTask(projectId, taskid, body){
    body = {...body, project: projectId}
    let result = axios
	.put("http://localhost:3000/projects/"+projectId+"/trackedtime/"+taskid, body)
	.then(res => {
	    result = res
	    console.log(res);
	})
	.catch(error => {
	    result = error
	});
    
    return result;
}
