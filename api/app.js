// var http = require('http');
const config = require('../config');
var express =    require("express");
var session = require('express-session');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoOp =    require("./server/models/mongo"); // le modèle mongodb
var cors = require("cors"); // cors permet de setup les headers pour effectuer des appels cross-domain
let API_PORT;

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// const { db: { host, port, name } } = config;
// const { app: { port, url } } = config;
// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> "+config.app.port);


var sess = {
    secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
    proxy: true,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
}

// if (app.get('env') === 'production') {
//     app.set('trust proxy', 1) // trust first proxy
//     API_PORT = config.app.port;
// } else {
//     API_PORT = config.app.port;
// }

app.use(session(sess))

var routes = require("./server/routes.js")(app);

var server = app.listen(config.app.port, function () {
    console.log("Listening on port %s...", server.address().port);
});
