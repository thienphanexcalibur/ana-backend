"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_controller_1 = require("@controller/app.controller");
var _utils_1 = require("@utils");
var PostController = /** @class */ (function (_super) {
    __extends(PostController, _super);
    function PostController(model) {
        var _this = _super.call(this, model) || this;
        _this.addPost = _this.addPost.bind(_this);
        _this.editPost = _this.editPost.bind(_this);
        _this.deletePost = _this.deletePost.bind(_this);
        _this.getPost = _this.getPost.bind(_this);
        _this.addComment = _this.addComment.bind(_this);
        return _this;
    }
    PostController.prototype.addComment = function (post, commentId) {
        return __awaiter(this, void 0, void 0, function () {
            var foundPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(post)];
                    case 1:
                        foundPost = _a.sent();
                        foundPost.comments.push(commentId);
                        return [2 /*return*/, foundPost.save()];
                }
            });
        });
    };
    PostController.prototype.addPost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, content, byUser, newPost, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, title = _a.title, content = _a.content, byUser = _a.byUser;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.add({ title: title, content: content, byUser: byUser })];
                    case 2:
                        newPost = _b.sent();
                        res.send(newPost);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        res.send('failure');
                        _utils_1.logger.log('error', e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.editPost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, title, content, byUser, modifiedPost, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        _a = req.body, title = _a.title, content = _a.content, byUser = _a.byUser;
                        return [4 /*yield*/, this.modify(id, { title: title, content: content, updated_date: Date.now(), byUser: byUser })];
                    case 1:
                        modifiedPost = _b.sent();
                        if (modifiedPost) {
                            res.send(modifiedPost);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _b.sent();
                        res.send('failure');
                        _utils_1.logger.log('error', e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.deletePost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deletedPost, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.remove(id)];
                    case 2:
                        deletedPost = _a.sent();
                        if (deletedPost) {
                            res.send('success');
                        }
                        else {
                            res.sendStatus(404);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        res.send('failure');
                        _utils_1.logger.log('error', e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.getPost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, post, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.find(id)];
                    case 2:
                        post = _a.sent();
                        if (post) {
                            res.send(post);
                        }
                        else {
                            res.sendStatus(404);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        _utils_1.logger.log(e_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return PostController;
}(app_controller_1.default));
exports.PostController = PostController;
