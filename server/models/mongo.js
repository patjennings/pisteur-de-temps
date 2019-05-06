var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/time-tracker', { useNewUrlParser: true });

// create instance of Schema
var mongoSchema = mongoose.Schema;

// create schemas
var userSchema  = {
    "firstName": String,
    "lastName": String,
    "email" : String,
    "password" : String,
    "relatedProjects" : Array
};
var clientSchema  = {
    "name": String,
};
var projectSchema  = {
    "name": String,
    "description": String,
    "budget": Number,
    "relatedClient": String
};

var trackedTimeSchema = {
    "task": String,
    "comment": String,
    "value": Number,
    "dateCreation": String,
    "dateUpdate": String,
    "relatedProject": String,
    "relatedUser": String
};

// create model if not exists.
// Le premier paramètre est le nom de la collection, le deuxième, le schéma utilisé
var users = mongoose.model('users', userSchema);
var clients = mongoose.model('clients', clientSchema);
var projects = mongoose.model('projects', projectSchema);
var trackedTime = mongoose.model('trackedTime', trackedTimeSchema, 'trackedTime' ); // On évite que Mongoose nous ajoute un s à la collection, et travaille avec cette version

// then exports models, so it can be used somewhere else
exports.users = users;
exports.clients = clients;
exports.projects = projects;
exports.trackedTime = trackedTime;