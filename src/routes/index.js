"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _middlewares_1 = require("@middlewares");
function routes(app) {
    app.use('/auth', _middlewares_1.AuthMiddleware);
    app.use('/post', _middlewares_1.PostMiddleware);
    app.use('/comment', _middlewares_1.CommentMiddleware);
}
exports.default = routes;
