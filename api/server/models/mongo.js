var mongoose    =   require("mongoose");
const config = require('../../../config');
mongoose.connect('mongodb://'+config.db.host+':'+config.db.port.toString()+'/'+config.db.name, { useNewUrlParser: true });

// create instance of Schema
var mongoSchema = mongoose.Schema;

// create schemas
var paramsSchema = {
    "_id": String,
    "value": String
}

var userSchema  = {
    "firstName": String,
    "lastName": String,
    "email" : String,
    "password" : String,
    "isAdmin" : Boolean,
    "isFirst" : Boolean,
    "relatedProjects" : Array,
    "date": String,
    "ip": String,
    "cookie": String,
    "key": String
};
var clientSchema  = {
    "name": String
};
var projectSchema  = {
    "name": String,
    "description": String,
    "budget": Number,
    "relatedClient": String,
    "hasTracks": Boolean,
    "tasks": Array
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
var params = mongoose.model('params', paramsSchema);
var users = mongoose.model('users', userSchema);
var clients = mongoose.model('clients', clientSchema);
var projects = mongoose.model('projects', projectSchema);
var trackedTime = mongoose.model('trackedTime', trackedTimeSchema, 'trackedTime' ); // On évite que Mongoose nous ajoute un s à la collection, et travaille avec cette version

// then exports models, so it can be used somewhere else
exports.params = params;
exports.users = users;
exports.clients = clients;
exports.projects = projects;
exports.trackedTime = trackedTime;
