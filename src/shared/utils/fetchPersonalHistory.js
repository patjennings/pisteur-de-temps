import axios from "axios";
import {getUserName, getClientName} from "utils/defsConverter";
import {getFullTime, getPercent} from 'utils/budget';

export default function fetchPersonalHistory(userId){
    // console.log(userId);
    let result = axios
	.get("http://localhost:3000/users/"+userId+"/trackedTime")
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
	    // ... et j'ajoute ensuite chacun au tableau trackHistory[]
	    // const newState = Object.assign({}, this.state, {
	    //     trackHistory: fetchedHistory
	    // });
	    // this.setState(newState);
	})
	.catch(error => console.log(error));
    return result;
}
