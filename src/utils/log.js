"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
require("winston-mongodb");
var _a = winston.format, combine = _a.combine, timestamp = _a.timestamp, label = _a.label, prettyPrint = _a.prettyPrint, colorize = _a.colorize;
var _b = process.env, DB_HOST = _b.DB_HOST, DB_PORT = _b.DB_PORT, DB_ROOT = _b.DB_ROOT, mode = _b.mode;
var isProd = mode === 'PRODUCTION';
var transports = winston.transports;
exports.logger = winston.createLogger({
    defaultMeta: { service: 'user-service' },
    transports: [
        isProd ? new transports.MongoDB({
            level: 'error',
            db: "mongodb://" + DB_HOST + ":" + DB_PORT + "/" + DB_ROOT,
            options: { useNewUrlParser: true, useUnifiedTopology: true },
            includeIds: true
        }) : new winston.transports.File({
            level: 'error',
            filename: 'error.log',
            format: combine(colorize(), timestamp(), prettyPrint())
        })
    ]
});
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
//# sourceMappingURL=log.js.map