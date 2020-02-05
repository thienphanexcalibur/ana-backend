"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var User_1 = require("./User");
var Post_1 = require("./Post");
var CommentSchema = new mongoose_1.Schema({
    comment: String,
    byUser: { type: mongoose_1.Types.ObjectId, refer: User_1.default },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    liked: {
        type: Number,
        default: 1
    },
    disliked: {
        type: Number,
        default: 0
    },
    post: { type: mongoose_1.Types.ObjectId, refer: Post_1.default }
});
var CommentModel = mongoose_1.model('Comment', CommentSchema);
exports.default = CommentModel;
