import axios from "axios";

export default async function TrackDelete(projectId, trackId){
    let result;
    axios.
	delete("http://localhost:3000/projects/"+projectId+"/trackedtime/"+trackId)
	.then(res => {
	    result = res;
	})
	.catch(error => {
	    result = error
	});
    return result;
}
