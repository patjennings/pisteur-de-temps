export function getUserName(defs, id){
    let result = null;
    const node = defs.usersDefinitions.filter(
	item => {return item._id == id;}
    );
    node.map(r => {
	result = r.firstName;
    });
    return result;
}
export function getProjectName(defs, id){
    let result = null;
    const node = defs.projectsDefinitions.filter(
	item => {return item._id == id;}
    );
    node.map(r => {
	result = r.name;
    });
    return result;
}
export function getClientName(defs, id){
    let result = null;
    const node = defs.clientsDefinitions.filter(
	item => {return item._id == id;}
    );
    node.map(r => {
	result = r.name;
    });
    return result;   
}
