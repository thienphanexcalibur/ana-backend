"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Middlewares
var express_1 = require("express");
var _controller_1 = require("@controller");
var _entity_1 = require("@entity");
var router = express_1.Router();
exports.router = router;
var authController = new _controller_1.AuthController(_entity_1.UserModel);
router.post('/signup', authController.signup);
router.post('/', authController.auth);
//# sourceMappingURL=auth.js.map