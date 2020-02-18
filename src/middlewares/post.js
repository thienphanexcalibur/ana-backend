"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Middlewares
var express_1 = require("express");
var _controller_1 = require("@controller");
var _entity_1 = require("@entity");
var router = express_1.Router();
exports.router = router;
var postController = new _controller_1.PostController(_entity_1.PostModel);
router.route('/:id')
    .get(postController.getPost)
    .delete(postController.deletePost);
router.post('/add', postController.addPost);
router.post('/modify/:id', postController.editPost);
