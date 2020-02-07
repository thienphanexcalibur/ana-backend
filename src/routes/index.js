"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("@controller/auth.controller");
var router = express_1.Router();
var authController = new auth_controller_1.default();
router.post('/auth', authController.auth);
router.post('/auth/signup', authController.signup);
exports.default = router;
