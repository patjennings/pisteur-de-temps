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
    console.log("toto");
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
