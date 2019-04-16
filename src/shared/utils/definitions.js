import axios from 'axios';

class Definitions{
    constructor(){
	this.definitions = {
	    clientsDefinitions: null,
	    projectsDefinitions: null,
	    usersDefinitions: null
	};
    }
    async getDefinitions(){
	const clientsDefs = await axios.get("http://localhost:3000/clients");
	const projectsDefs = await axios.get("http://localhost:3000/projects");
	const usersDefs = await axios.get("http://localhost:3000/users");

	this.definitions.clientsDefinitions = clientsDefs.data
	this.definitions.projectsDefinitions = projectsDefs.data
	this.definitions.usersDefinitions = usersDefs.data

	return this.definitions
    }
}
export default Definitions;
