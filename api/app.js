// var http = require('http');
var express =    require("express");
var session = require('express-session');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoOp =    require("./server/models/mongo"); // le modèle mongodb
var cors = require("cors"); // cors permet de setup les headers pour effectuer des appels cross-domain

var app = express();
const whitleListDomain = ['http://localhost:3000', 'http://localhost', 'https://time.api.thomasguesnon.net'];

app.set('views', __dirname + '/server/views');
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(
        origin: function(origin, callback){
	// allow requests with no origin 
	// (like mobile apps or curl requests)
	if(!origin) return callback(null, true);
	if(whitleListDomain.indexOf(origin) === -1){
	    var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
	    return callback(new Error(msg), false);
	}
	return callback(null, true);
    }
}));


var sess = {
  secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
    proxy: true,
    resave: true,
    saveUninitialized: true
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

// app.use(session(sess))

var routes = require("./server/routes.js")(app);

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
