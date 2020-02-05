"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/version', function (req, res, next) {
    res.send('1.0.0');
});
router.post('/auth', function (req, res, next) {
});
router.get('/post/:id', function (req, res, next) {
});
exports.default = router;
