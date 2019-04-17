var models =    require("../models/mongo"); // le modèle mongodb
var path = require("path");
var express = require("express");

// console.log(models.base.Mongoose);
// req > request
// res > response

module.exports = function(app){

    app.use("/styles", express.static(path.resolve(".") + '/node_modules/bootstrap/dist/css')); 

    app.use("/scripts/bootstrap", express.static(path.resolve(".") + '/node_modules/bootstrap/dist/js'));
    app.use("/scripts/popper", express.static(path.resolve(".") + '/node_modules/popper.js/dist'));
    app.use("/scripts/jquery", express.static(path.resolve(".") + '/node_modules/jquery/dist')); 
    
    app.get("/", function(req, res) {
	res.json({"error" : false,"message" : "Hello World"});
    });
    
    // ------------
    // USERS
    // ------------
    app.get("/users", function (req, res) {
	var response = {};
	models.users.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
		response = [];
		// on ne veut pas renvoyer tout l'enregistrement avec le pwd, donc on prend les données et on expose ce qu'on veut
		for(id in data){
		    result = {}
		    result._id = data[id]._id;
		    result.firstName = data[id].firstName;
		    result.lastName = data[id].lastName;
		    result.projects = data[id].relatedProjects;
		    response.push(result);
		}
            }
	    res.json(response);
        });
    });
    app.post("/users", function (req, res) {
	var db = new models.users(); // on créer ce nouvel objet models pour accéder au schéma
	var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
	db.firstName = req.body.firstName;
	db.lastName = req.body.lastName;
        db.email = req.body.email;
        // Hash the password using SHA1 algorithm.
        db.password =  require('crypto')
            .createHash('sha1')
            .update(req.body.password)
            .digest('base64');
	db.relatedProjects = req.body.projects;
        db.save(function(err, db){
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "User added", "data" : db };
            }
            res.json(response);
        });
    });
    app.get("/users/:id", function (req, res) {
	var response = {};
	models.users.findById(req.params.id, function(err,data){
	    if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		response._id = data._id;
		response.firstName = data.firstName;
		response.lastName = data.lastName;
		response.projects = data.relatedProjects;
	    }
	    res.json(response);
        });
    });
    app.put("/users/:id", function (req, res) {
	var response = {};
	models.users.findById(req.params.id, function(err,data){
	    if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		if (req.body.email !== undefined) {
		    data.email = req.body.email;
		}
		if (req.body.firstName !== undefined) {
		    data.firstName = req.body.firstName;
		}
		if (req.body.lastName !== undefined) {
		    data.lastName = req.body.lastName;
		}
		if (req.body.password !== undefined) {
		    data.password = req.body.password;
		}
		if (req.body.projects !== undefined) {
		    data.relatedProjects = req.body.projects;
		}
		// Save data
		data.save(function(err, data){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id, "data" : data};
                    }
		    res.json(response);
		})
	    }
        });
    });
    app.delete("/users/:id", function (req, res) {
	var response = {};
	models.users.findById(req.params.id, function(err,data){
	    if(err){
		response = {"error" : true,"message" : "Error retrieving data"};
	    } else {
		models.users.deleteOne({ _id : req.params.id}, function(err, obj){
		    if(err){
			response = {"error" : true, "message" : "Error while deleting data"};
		    } else {
			response = {"error" : false, "message" : "User is removed"};
		    }
		});
	    }
	    res.send(response);
        });
    });
    app.get("/users/:id/projects", function (req, res) {
	var response = [];
	var projectIDs;

	// retrieve project ids associated with the user
	models.users.findById(req.params.id, function(err,data){
	    if(err) {
		response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		projectIDs = data.relatedProjects;
		
		models.projects.find({ _id: { $in: projectIDs } }, function(err,data){
		    if(err) {
			response = {"error" : true,"message" : "Error fetching data"};
		    } else {
			for(id in data){
			    var result = {}
			    result._id = data[id]._id;
			    result.name = data[id].name;
			    response.push(result);
			}
		    }
		    res.json(response);
		});
	    }
	});	
    });

    
    // ------------
    // PROJECTS
    // ------------
    app.get("/projects/", function (req, res) {
	var response = {};
	models.projects.find({},function(err,data){
	    if(err) {
		response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		response = [];
		for(id in data){
		    result = {}
		    result._id = data[id]._id;
		    result.name = data[id].name;
		    result.description = data[id].description;
		    result.budget = data[id].budget;
		    result.client = data[id].relatedClient;
		    response.push(result);
		}
	    }
	    res.json(response);
	});
    });
    app.post("/projects/", function (req, res) {
	var db = new models.projects(); // on crée ce nouvel objet models pour accéder au schéma
	var response = {};

	db.name = req.body.name;
	db.relatedClient = req.body.client;
	
	db.save(function(err, db){
	    // save() will run insert() command of MongoDB.
	    // it will add new data in collection.
	    if(err) {
		response = {"error" : true, "message" : "Error adding data"};
	    } else {
		response = {"error" : false, "message" : "Project added", "data" : db};
	    }
	    res.json(response);
	});
    });
    app.get("/projects/:id", function (req, res) {
	var response = {};
	models.projects.findById(req.params.id, function(err,data){
	    if(err) {
		response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		response._id = data._id;
		response.name = data.name;
		response.description = data.description;
		response.budget = data.budget;
		response.client = data.relatedClient;
	    }
	    res.json(response);
	});
    });
    app.put("/projects/:id", function (req, res) {
	var response = {};
	models.projects.findById(req.params.id, function(err,data){
	    if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		if (req.body.name !== undefined) {
		    data.name = req.body.name;
		}
		if (req.body.client !== undefined) {
		    data.relatedClient = req.body.client;
		}
		if (req.body.description !== undefined) {
		    data.description = req.body.description;
		}
		if (req.body.budget !== undefined) {
		    data.budget = req.body.budget;
		}
		// Save data
		data.save(function(err, data){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Project is updated for "+req.params.id, "data" : data };
                    }
		    res.json(response);
		})
	    }
        });
    });
    app.delete("/projects/:id", function (req, res) {
	var response = {};
	models.projects.findById(req.params.id, function(err,data){
	    if(err){
		response = {"error" : true,"message" : "Error retrieving data"};
	    } else {
		models.projects.deleteOne({ _id : req.params.id}, function(err, obj){
		    if(err){
			response = {"error" : true, "message" : "Error while deleting data"};
		    } else {
			response = {"error" : false, "message" : "Project is removed"};
		    }
		});
	    }
	    res.send(response);
        });
    });

    // tracked time
    app.get("/projects/:id/trackedtime", function (req, res) {
	var response = {};
	models.trackedTime.find({ relatedProject : req.params.id },function(err,data){
	    if(err) {
		response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		response = {"error" : false, "message" : data };
	    }
	    res.json(response);
	});	
    });
    app.post("/projects/:id/trackedtime", function (req, res) {
	var db = new models.trackedTime(); // on crée ce nouvel objet models pour accéder au schéma
	var response = {};
	var d = new Date(); // sert à renseigner la date de post 

	db.task = req.body.task;
	db.comment = req.body.comment;
	db.value = req.body.value;
	db.dateCreation = d.toJSON(); // on convertit en json pour la bdd
	db.dateUpdate = null; 
	db.relatedProject = req.params.id;
	db.relatedUser = req.body.user;
	
	db.save(function(err, db){
	    // save() will run insert() command of MongoDB.
	    // it will add new data in collection.
	    // console.log(data);
	    if(err) {
		response = {"error" : true,"message" : "Error adding data"};
	    } else {
		response = {"error" : false,"message" : "Tracked time added", "data" : db};
	    }
	    res.json(response);
	});	
    });
    app.get("/projects/:id/trackedtime/:trackid", function (req, res) {
	var response = {};
	
	models.trackedTime.findById(req.params.trackid, function(err,data){
	    if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		response = {"error" : false, "message" : data};
	    }
	    res.json(response);
        });	
    });

    app.put("/projects/:id/trackedtime/:trackid", function (req, res) {
	var response = {};
	var d = new Date(); // sert à renseigner la date de l'update
	
	models.trackedTime.findById(req.params.trackid, function(err,data){
	    if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		if (req.body.task !== undefined) {
		    data.task = req.body.task;
		}
		if (req.body.comment !== undefined) {
		    data.comment = req.body.comment;
		}
		if (req.body.value !== undefined) {
		    data.value = req.body.value;
		}
		if (req.body.project !== undefined) {
		    data.relatedProject = req.body.project;
		}
		if (req.body.user !== undefined) {
		    data.relatedUser = req.body.user;
		}
		data.dateUpdate = d.toJSON(); // on remplit le champ update
		
		// Save data
		data.save(function(err, data){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Tracked time is updated for "+req.params.trackid, "data" : data };
                    }
		    res.json(response);
		})
	    }
        });
    });
    app.delete("/projects/:id/trackedtime/:trackid", function (req, res) {
	var response = {};
	models.trackedTime.findById(req.params.trackid, function(err,data){
	    if(err){
		response = {"error" : true,"message" : "Error retrieving data"};
	    } else {
		models.trackedTime.deleteOne({ _id : req.params.trackid}, function(err, obj){
		    if(err){
			response = {"error" : true, "message" : "Error while deleting data"};
		    } else {
			response = {"error" : false, "message" : "Tracked time is removed"};
		    }
		});
	    }
	    res.send(response);
        });	
    });

    // obtenir tout le temps tracké pour un user
     app.get("/users/:userid/trackedtime/", function (req, res) {
	var response = {};

	 models.trackedTime.find({ relatedUser : req.params.userid },function(err,data){
	    if(err) {
		response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		response = {"error" : false, "message" : data };
	    }
	    res.json(response);
	});	
    });
    
    
    // ------------
    // CLIENTS
    // ------------
    app.get("/clients/", function (req, res) {
	var response = {};
	models.clients.find({},function(err,data){
	    if(err) {
		response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		response = [];
		for(id in data){
		    result = {}
		    result._id = data[id]._id;
		    result.name = data[id].name;
		    response.push(result);
		}
	    }
	    res.json(response);
	});
    });
    app.post("/clients/", function (req, res) {
	var db = new models.clients();
	var response = {};

	db.name = req.body.name;
	
	db.save(function(err, db){
	    // save() will run insert() command of MongoDB.
	    // it will add new data in collection.
	    // console.log(data);
	    if(err) {
		response = {"error" : true,"message" : "Error adding data"};
	    } else {
		response = {"error" : false,"message" : "Client added", "data" : data};
	    }
	    res.json(response);
	});
    });
    app.get("/clients/:id", function (req, res) {
	var response = {};
	models.clients.findById(req.params.id, function(err,data){
	    if(err) {
		response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		response._id = data._id;
		response.name = data.name;
	    }
	    res.json(response);
	});
    });
    app.put("/clients/:id", function (req, res) {
	var response = {};
	models.clients.findById(req.params.id, function(err,data){
	    if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		if (req.body.name !== undefined) {
		    data.name = req.body.name;
		}
		// Save data
		data.save(function(err, data){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id, "data" : data};
                    }
		    res.json(response);
		})
	    }
        });
    });
    app.delete("/clients/:id", function (req, res) {
	var response = {};
	models.clients.findById(req.params.id, function(err,data){
	    if(err){
		response = {"error" : true,"message" : "Error retrieving data"};
	    } else {
		models.clients.deleteOne({ _id : req.params.id}, function(err, obj){
		    if(err){
			response = {"error" : true, "message" : "Error while deleting data"};
		    } else {
			response = {"error" : false, "message" : "Client is removed"};
		    }
		});
	    }
	    res.send(response);
        });
    });
}




