"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var _routes_1 = require("@routes");
var _a = process.env, SERVER_HOST = _a.SERVER_HOST, SERVER_PORT = _a.SERVER_PORT, DB_HOST = _a.DB_HOST, DB_PORT = _a.DB_PORT, DB_ROOT = _a.DB_ROOT;
var app = express();
var dbURI = "mongodb://" + DB_HOST + ":" + DB_PORT + "/" + DB_ROOT;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
app.use(bodyParser.json());
app.use(_routes_1.default);
app.use(function (req, res, next) {
    console.log(Date.now() + ": " + req.method + " " + req.url);
    next();
});
app.use(function (err, req, res, next) {
    console.log(err);
    next();
});
// start express server
app.listen(SERVER_PORT, function () {
    db.once('open', function () {
        console.log('MongoDB is connected');
    });
    db.on('error', function (e) {
        console.log('Server got trouble connecting', e);
    });
    console.log('Server is up at ', SERVER_PORT);
});
