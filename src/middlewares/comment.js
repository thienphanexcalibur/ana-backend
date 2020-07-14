"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var _controller_1 = require("@controller");
var _entity_1 = require("@entity");
var router = express_1.Router();
exports.router = router;
var commentController = new _controller_1.CommentController(_entity_1.CommentModel);
router.route('/add').post(commentController.addComment);
//# sourceMappingURL=comment.js.map