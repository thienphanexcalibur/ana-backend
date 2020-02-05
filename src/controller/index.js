"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.post('/auth', function (req, res, next) {
    res.send(req.body.username + req.body.password);
});
exports.default = router;
