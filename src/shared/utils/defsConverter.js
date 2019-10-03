import {toJS} from "mobx";

// get a username from an id and a list of definitions (list of ids+related name)
export function getUserName(defs, id){
    let result = null;
    const node = defs.filter(
	item => {return item._id == id;}
    );
    node.map(r => {
	result = r.firstName;
    });
    return result;
}
// get a project name from an id and a list of definitions (list of ids+related name)
export function getProjectName(defs, id){
    let result = null;
    const node = defs.filter(
    	item => {return item._id == id;}
    );
    node.map(r => {
    	result = r.name;
    });
    return result;
}
// get a client name from an id and a list of definitions (list of ids+related name)
export function getClientName(defs, id){
    let result = null;
    const node = defs.filter(
	item => {return item._id == id;}
    );
    node.map(r => {
	result = r.name;
    });
    return result;   
}

export function getProjectsNumberForClient(defs, id){
    let result = 0
    const list = toJS(defs);

    list.forEach(l => {
	id == l.client && result++
	console.log(l.client);
    })
    
    return result;
}
export function getTracksNumberForProject(defs, id){
    let result = 0
    const list = toJS(defs);

    list.forEach(l => {
	id == l.client && result++
	console.log(l.client);
    })
    
    return result;
}
export function getTasksForProject(defs, id){
    let result = null;
    const list = toJS(defs);
    
    const node = list.filter(
    	item => {return item._id == id;}
    );
    node.map(r => {
	result = r.tasks;
    });
    return result;
}
