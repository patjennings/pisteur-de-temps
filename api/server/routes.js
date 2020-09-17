var models =       require("./models/mongo"); // le modèle mongodb
var path =         require("path");
var express =      require("express");
var crypto =       require("crypto");
var cookieParser = require("cookie-parser");
var emailjs =   require("emailjs/email");
const config = require('../../config');

var validatePassword = require("./utils/validation").validatePassword;
var saltAndHash =      require("./utils/validation").saltAndHash;

var generateKey = require("./utils/validation").generateKey;

const APP_ROOT = config.app.url;

module.exports = function(app){

    // folders
    app.use("/styles", express.static(path.resolve(".") + '/node_modules/bootstrap/dist/css')); 
    app.use("/dist", express.static(path.resolve(".") + '/dist'));
    app.use("/assets", express.static(path.resolve(".") + '/dist/assets')); 

    // scripts
    app.use("/scripts/bootstrap", express.static(path.resolve(".") + '/node_modules/bootstrap/dist/js'));
    app.use("/scripts/popper", express.static(path.resolve(".") + '/node_modules/popper.js/dist'));
    app.use("/scripts/jquery", express.static(path.resolve(".") + '/node_modules/jquery/dist')); 

    // serve static files built by React
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging" ? app.use(express.static(path.resolve(".") + "/build")) : null;


    function nocache(req, res, next) {
        console.log("NO CAAAACHE");
        console.log(process.env.NODE_ENV);
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    }

    app.get("/", nocache, function(req, res) {
        // req.session.user = "thomas";                                                                                                                                 
        // on laisse react+mobx s'occuper du check du cookie, pour logger ou pas l'utilisateur                                                                          
        // on rend juste la coquille avec le #root                                                                                                                      
        process.env.NODE_ENV === "dev" ? res.render('app', {title: "App root"}) : res.sendFile(path.join(__dirname, "build", "index.html"));
    });

    // là pareil, on se contente de rendre le coquille                                                                                                                  
    // sur ces urls                                                                                                                                                     
    // reactrouter fait le boulot, ensuite, pour rendre les bons composants.                                                                                            
    app.get('/overview', nocache, function(req, res) {
	process.env.NODE_ENV === "dev" ? res.render('app', {title: "App root"}) : res.sendFile(path.join(__dirname, "../..","build", "index.html"));
    });
    app.get('/account', nocache, function(req, res) {
	process.env.NODE_ENV === "dev" ? res.render('app', {title: "App root"}) : res.sendFile(path.join(__dirname, "../..","build", "index.html"));
    });
    app.get('/synthesis', nocache, function(req, res) {
	process.env.NODE_ENV === "dev" ? res.render('app', {title: "App root"}) : res.sendFile(path.join(__dirname, "../..","build", "index.html"));
    });
    app.get('/admin', nocache, function(req, res) {
        process.env.NODE_ENV === "dev" ? res.render('app', {title: "App root"}) : res.sendFile(path.join(__dirname, "../..","build", "index.html"));
    });
    app.get('/logout', nocache, function(req, res) {
        process.env.NODE_ENV === "dev" ? res.render('app', {title: "App root"}) : res.sendFile(path.join(__dirname, "../..","build", "index.html"));
    });


    // -----------------
    // LOST PASSWORD
    // -----------------
    app.get('/lost-password', nocache, function(req, res){
	process.env.NODE_ENV === "dev" ? res.render('app', {title: "App root"}) : res.sendFile(path.join(__dirname, "build", "index.html"));
    })
    
    app.post('/api/lost-password',  function(req, res){

	var response = {};

	const email = req.query.email;
	const ip = req.query.ip;
	
	let pwkey = generateKey();

	// infos pour envoyer l'email
	var server = emailjs.server.connect({
	    user:    "bonjour@thomasguesnon.fr",
	    password:"xxxxxxxx",
	    host:    "ssl0.ovh.net",
	    ssl:     true
	});
	
	models.users.findOne({email: email}, function(err, data){
	    if(err || data == null){
		response = {"error": true, "message" : "no account with this email"};
		res.json(response);
	    } else {
		data.key = pwkey;
		data.ip = ip;

		// on sauve dans la base
		data.save(function(er, d){   
		    if(err) {
			response = {"error" : true,"message" : "Error updating data"};
		    } else {
			response = {"error" : false, "message" : d._id+"updated with the key "+pwkey, "userId" : d._id};
		    }
		    res.json(response);
		});

		//on envoie le mail
		server.send({
		    text:    `This is your link ${APP_ROOT}/reset-password?key=${pwkey}`,
		    from:    "Thomas from Timetracker <do-not-reply@timetracker.net>",
		    to:      email,
		    subject: "Password retrieval"
		}, function(err, message) {
		    console.log(err || message);
		    
		});
	    }
	})
	
	
    })


    
    // -----------------
    // RESET PASSWORD
    // -----------------
    app.get('/reset-password', nocache, function(req, res){
	// console.log(req.query.key);
	// validate the password key
	process.env.NODE_ENV === "dev" ? res.render('app', {title: "App root"}) : res.sendFile(path.join(__dirname, "build", "index.html"));
	// res.json(req.query.key);
    })


    // user clicks on the link
    // reset-password?key=zaervjrstlkzrktbn
    // enter new password
    // find the document with the key
    // salt+hash the password, and save it in the db

    app.post('/api/reset-password', function(req, res){

	var response = {};

	const newpassword = req.query.newpassword;
	const key = req.query.key;
	
	models.users.findOne({key: key}, function(err, data){
	    if(err || data == null){
		response = {"error": true, "message" : "There is no account with this key."};
		res.json(response);
	    } else {

		// Hash the password using SHA1 algorithm, plus the salt
		const hash  = saltAndHash(newpassword);
		data.password = hash;

		// on sauve dans la base
		data.save(function(er, d){   
		    if(err) {
			response = {"error" : true,"message" : "Error updating data"};
		    } else {
			response = {"error" : false, "message" : "password updated for "+d._id, "userId" : d._id};
		    }
		    res.json(response);
		});
	    }
	})
    })

    // ------------
    // LOGIN
    // ------------
    // On envoie une proposition de login + mdp
    // si ok avec la base, on retient le record, et on y ajoute la clef du cookie + l'ip
    app.post("/api/login", function (req, res) {
	var response = {};
	
	const email = req.query.email;
	const password = req.query.password;
	const isCookie = req.query.isCookie;

	models.users.findOne({email: email}, function(err, data){
            if(err || data == null) {
                response = {"error" : true, "message" : "User not found"};
		res.json(response);
            } else {
		isPasswordValid = validatePassword(password, data.password);

		if(isPasswordValid){
		    
		    const loginKey = generateKey();

		    if(isCookie){
			res.cookie('login', loginKey, { maxAge: 900000 });
			data.ip = req.ip;
			data.cookie = loginKey;
		    }

		    // Save cookie + ip
		    data.save(function(er, d){   
			if(err) {
			    response = {"error" : true,"message" : "Error updating data"};
			} else {
			    response = {"error" : false, "message" : d.email+" is now connected, "+d._id+" updated", "userId" : d._id};
			}
			res.json(response);
		    });
		}
		else {
		    response = {"error" : true, "message" : "Invalid password"};
		    res.json(response);
		}
            }
        })
    });

    
    // ------------
    // COOKIES
    // ------------
    // checke si un cookie est actif, et retourne l'utilisateur associé
    app.get("/api/cookie", function (req, res) {
	var response = {};
	
	const key = req.query.key;
	const ip = req.query.ip;

	models.users.findOne({cookie: key, ip: ip}, function(err, data){
            if(err || data == null) {
                response = {"error" : true, "message" : "Cookie not active"};
		res.json(response);
            }
	    else {
		response = {"error" : false, "cookie" : true, "data" : data};
		res.json(response);		
	    }
	})
    });

    // ------------
    // PARAMS
    // ------------
    app.get("/api/params", function (req, res) {
	var response = {};
	// console.log("config");
	models.params.find({}, function(err,data){
	    console.log(data);
	    if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		response = data;
	    }
	    res.json(response);
        });
    });
    app.put("/api/params/:id", function (req, res) {
	var response = {};
	
	models.params.findById(req.params.id, function(err,data){
	    if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		data.value = req.body.value;

		// Save data
		data.save(function(err, data){
		    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
		    } else {
                        response = {"error" : false,"message" : "Data is updated for unit", "data" : data};
		    }
		    res.json(response);
		})
	    }
        });
    });

    
    // ------------
    // USERS
    // ------------
    app.get("/api/users", function (req, res) {
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
		    result.relatedProjects = data[id].relatedProjects;
		    result.isAdmin = data[id].isAdmin;
		    result.isFirst = data[id].isFirst;

		    // console.log(data[id]);
		    
		    response.push(result);
		}
            }
	    res.json(response);
        });
    });
    app.post("/api/users", function (req, res) {
	var db = new models.users(); // on créer ce nouvel objet models pour accéder au schéma
	var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.

	// si c'est le premier utilisateur, on lui met le flag user0
	let isFirstUser;
	
	models.users.find({}, function(err, data){
	    if(err){
		return null;
	    } else {
		if(data.length > 0){
		    isFirstUser = false;
		} else {
		    isFirstUser = true;
		}
		saveUser();
	    }
	});
	// console.log(isFirstUser);

	function saveUser(){
	    db.firstName = req.body.firstName;
	    db.lastName = req.body.lastName;
            db.email = req.body.email;
	    db.date = new Date();
	    db.isAdmin = req.body.isAdmin;
	    db.ip = null;
	    db.cookie = null;
	    db.isFirst = isFirstUser;
	    
            // Hash the password using SHA1 algorithm, plus the salt
            const hash  = saltAndHash(req.body.password);
	    db.password = hash;
	    
	    db.relatedProjects = req.body.relatedProjects;
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
	}
	
	
    });
    app.get("/api/user/:id", function (req, res) {
	var response = {};
	models.users.findById(req.params.id, function(err,data){
	    if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		response._id = data._id;
		response.firstName = data.firstName;
		response.lastName = data.lastName;
		response.projects = data.relatedProjects;
		response.date = data.date;
		response.email = data.email;
		response.isAdmin = data.isAdmin;
	    }
	    res.json(response);
        });
    });
    app.put("/api/user/:id", function (req, res) {
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
		if (req.body.isAdmin !== undefined) {
		    data.isAdmin = req.body.isAdmin;
		}
		if (req.body.relatedProject !== undefined) {
		    if(req.query.action === "remove"){
			let index = data.relatedProjects.indexOf(req.body.relatedProject)
			data.relatedProjects.splice(index, 1)
		    } else {
			let isRelated = false;
			data.relatedProjects.forEach(rp => {
			    rp === req.body.relatedProject ? isRelated = true : isRelated = false;
			});
			if(isRelated){
		    	    console.log("Project is already related to this user");		    	
			} else {
			    data.relatedProjects.push(req.body.relatedProject);
			}
		    }
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
    app.delete("/api/user/:id", function (req, res) {
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
    // app.get("/api/users/:id/projects", function (req, res) {
    // 	var response = [];
    // 	var projectIDs;

    // 	// retrieve project ids associated with the user
    // 	models.users.findById(req.params.id, function(err,data){
    // 	    if(err) {
    // 		response = {"error" : true,"message" : "Error fetching data"};
    // 	    } else {
    // 		projectIDs = data.relatedProjects;
    
    // 		models.projects.find({ _id: { $in: projectIDs } }, function(err,data){
    // 		    if(err) {
    // 			response = {"error" : true,"message" : "Error fetching data"};
    // 		    } else {
    // 			for(id in data){
    // 			    var result = {}
    // 			    result._id = data[id]._id;
    // 			    result.name = data[id].name;
    // 			    response.push(result);
    // 			}
    // 		    }
    // 		    res.json(response);
    // 		});
    // 	    }
    // 	});	
    // });

    
    // ------------
    // PROJECTS
    // ------------
    app.get("/api/projects/", function (req, res) {
	var response = {};
	models.projects.find({},function(err,data){
	    if(err) {
		response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		response = [];
		// console.log(data);
		for(id in data){
		    result = {}
		    
		    result._id = data[id]._id;
		    result.name = data[id].name;
		    result.description = data[id].description;
		    result.budget = data[id].budget;
		    result.client = data[id].relatedClient;
		    result.hasTracks = data[id].hasTracks;
		    result.tasks = data[id].tasks;

		    console.log(data[id]);
		    
		    response.push(result);
		}
	    }
	    res.json(response);
	});
    });
    app.post("/api/projects/", function (req, res) {
	var db = new models.projects(); // on crée ce nouvel objet models pour accéder au schéma
	var response = {};

	db.name = req.body.name;
	db.relatedClient = req.body.client;
	db.description = req.body.description;
	db.budget = req.body.budget;
	db.hasTracks = false;
	db.tasks = [];
	
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
    app.get("/api/projects/:id", function (req, res) {
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
		response.tasks = data.tasks;
	    }
	    res.json(response);
	});
    });
    app.put("/api/projects/:id", function (req, res) {
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
		if (req.body.task !== undefined) {
		    // prévenir la présence d'une tâche similaire
		    data.tasks.push(req.body.task);
		}
		data.hasTracks = true;
		if(req.query.removeTask !== undefined){
		    index = data.tasks.indexOf(req.query.removeTask)
		    if(index > -1){
			data.tasks.splice(index, 1);
		    }

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
    app.delete("/api/projects/:id", function (req, res) {


	var response = {};
	models.projects.findById(req.params.id, function(err,data){
	    if(err){
		response = {"error" : true,"message" : "Error retrieving data"};
	    } else {
		models.projects.deleteOne({ _id : req.params.id}, function(err, obj){
		    if(err){
			response = {"error" : true, "message" : "Error while deleting data"};
		    } else {
			
			// puis, on supprime les track qui ont le ce projet en id
			models.trackedTime.deleteMany({relatedProject: req.params.id}, function(err,data){
			    if(err){
				response = {"error" : true,"message" : "Error deleting related project data"};
			    } else {
				
				response = {"error" : false, "message" : "Project and related tracks were deleted"};	 
			    }

			});
			res.send(response);
		    }
		});
	    }
	    
        });

	// on delete également les tracks related
	// models.trackedTime.deleteMany({relatedProject : req.params.id}), function(err, data){
	//     if(err){
	// 	response = {"error" : true,"message" : "Error deleting related tracked time"};
	//     } else {
	// 	response = {"error" : false, "message" : "Related"};	 
	//     }
	// }
	// res.send(response);
    });

    // tracked time
    app.get("/api/projects/:id/trackedtime", function (req, res) {
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
    app.post("/api/projects/:id/trackedtime", function (req, res) {
	// var proj = new models.projects();
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
	    // res.json(response);
	});

	// on flag le projet à hasTracks : true
	models.projects.findById(req.params.id, function(err,data){
	    if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		data.hasTracks = true;
		// Save data
		data.save(function(err, data){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Project is updated for "+req.params.id, "data" : data };
                    }
		    
		})
	    }
        });
	res.json(response);
    });
    
    app.get("/api/projects/:id/trackedtime/:trackid", function (req, res) {
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

    app.put("/api/projects/:id/trackedtime/:trackid", function (req, res) {
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
    app.delete("/api/projects/:id/trackedtime/:trackid", function (req, res) {
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
    app.get("/api/user/:userid/trackedtime/", function (req, res) {
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
    app.get("/api/clients/", function (req, res) {
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
    app.post("/api/clients/", function (req, res) {
	var db = new models.clients();
	var response = {};

	db.name = req.body.name;

	console.log(db);
	
	db.save(function(err, db){
	    // save() will run insert() command of MongoDB.
	    // it will add new data in collection.
	    // console.log(data);
	    if(err) {
		response = {"error" : true,"message" : "Error adding data"};
	    } else {
		response = {"error" : false,"message" : "Client added", "data" : db};
	    }
	    res.json(response);
	});
    });
    app.get("/api/clients/:id", function (req, res) {
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
    app.put("/api/clients/:id", function (req, res) {
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
    app.delete("/api/clients/:id", function (req, res) {
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




