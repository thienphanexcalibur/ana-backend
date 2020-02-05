"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Promise.resolve().then(function () { return require('module-alias/register'); });
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var _routes_1 = require("@routes");
var path = require('path');
var app = express();
var port = 3000;
var dbUri = 'mongodb://localhost:27017/reddit-clone';
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
app.use(bodyParser.json());
app.use(_routes_1.default);
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
var winston = require('winston');
var logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
