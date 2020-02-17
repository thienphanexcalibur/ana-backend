"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var User_1 = require("./User");
var Post_1 = require("./Post");
var CommentSchema = new mongoose_1.Schema({
    comment: String,
    byUser: {
        type: mongoose_1.Types.ObjectId,
        refer: User_1.UserModel
    },
    liked: {
        type: Number,
        default: 1
    },
    disliked: {
        type: Number,
        default: 0
    },
    post: { type: mongoose_1.Types.ObjectId, refer: Post_1.PostModel }
}, { timestamps: true });
exports.CommentModel = mongoose_1.model('Comment', CommentSchema);
