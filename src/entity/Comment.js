"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CommentSchema = new mongoose_1.Schema({
    comment: String,
    byUser: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    liked: {
        type: Number,
        default: 1,
    },
    disliked: {
        type: Number,
        default: 0,
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
    updated_date: {
        type: Date,
        default: Date.now,
    },
    post: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Post' },
});
exports.CommentModel = mongoose_1.model('Comment', CommentSchema);
//# sourceMappingURL=Comment.js.map