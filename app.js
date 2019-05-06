// var http = require('http');
var express =    require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var mongoOp =    require("./server/models/mongo"); // le modèle mongodb
var cors = require("cors"); // cors permet de setup les headers pour effectuer des appels cross-domain

// import express from "express";
// import bodyParser from "body-parser";
// import cookieParser from 'cookie-parser';
// import mongoOp from "./server/models/mongo"; // le modèle mongodb
// import cors from "cors"; // cors permet de setup les headers pour effectuer des appels cross-domain

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var routes = require("./server/routes.js")(app);
// import app from "./server/routes.js";

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
