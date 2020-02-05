"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(req, res, next) {
    res.send(req.body.username + req.body.password);
}
exports.default = default_1;
