import axios from "axios";

export default function addTask(projectId, body){
    let result = axios
	.post("http://localhost:3000/projects/"+projectId+"/trackedtime", {
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
