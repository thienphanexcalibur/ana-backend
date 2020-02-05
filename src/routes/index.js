"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("controller/auth.controller");
var router = express_1.Router();
router.post('/auth', auth_controller_1.default);
exports.default = router;
