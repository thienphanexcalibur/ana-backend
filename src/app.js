"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Promise.resolve().then(function () { return require('module-alias/register'); });
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var routes_1 = require("routes");
var path = require('path');
var app = express();
var port = 3000;
mongoose.connect('mongodb://localhost:27017/reddit-clone', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
app.use(bodyParser.json());
app.use(routes_1.default);
app.use(function (req, res, next) {
    console.log(Date.now() + ": " + req.method + " " + req.url);
});
// start express server
app.listen(port, function () {
    db.once('open', function () {
        console.log('MongoDB is connected');
    });
    db.on('error', function (e) {
        console.log('Server got trouble connecting', e);
    });
    console.log('Server is up at ', port);
});
