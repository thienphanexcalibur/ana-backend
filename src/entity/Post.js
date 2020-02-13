"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    },
    byUser: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose_1.Types.ObjectId, ref: 'Comment' }]
});
exports.PostModel = mongoose_1.model('Post', PostSchema);
