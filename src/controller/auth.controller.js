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
var _utils_1 = require("@utils");
var app_controller_1 = require("@controller/app.controller");
var _utils_2 = require("@utils");
var AuthController = /** @class */ (function (_super) {
    __extends(AuthController, _super);
    function AuthController(model) {
        var _this = _super.call(this, model) || this;
        _this.auth = _this.auth.bind(_this);
        _this.signup = _this.signup.bind(_this);
        return _this;
    }
    AuthController.prototype.signup = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, email, fullname, mobile, token, encryptedPwd, user, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password, email = _a.email, fullname = _a.fullname, mobile = _a.mobile;
                        token = _utils_1.generateToken({
                            username: username,
                            password: password
                        });
                        return [4 /*yield*/, _utils_1._hash(password)];
                    case 1:
                        encryptedPwd = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.add({ username: username,
                                password: encryptedPwd,
                                email: email,
                                fullname: fullname,
                                mobile: mobile,
                                token: token
                            })];
                    case 3:
                        user = _b.sent();
                        res.send('success');
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        _utils_2.logger.log('error', e_1);
                        res.send('failure');
                        return [2 /*return*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.auth = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, token, username, password, user, userInfo, user, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, token = _a.token, username = _a.username, password = _a.password;
                        if (!token) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.find({ token: token })];
                    case 1:
                        user = _b.sent();
                        userInfo = _utils_1.verifyToken(token);
                        res.send(userInfo ? 'success' : 'failure');
                        _b.label = 2;
                    case 2:
                        if (!(username && password)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.find({ username: username, password: password })];
                    case 3:
                        user = _b.sent();
                        return [4 /*yield*/, _utils_1._hashCompare(password, user.password)];
                    case 4:
                        result = _b.sent();
                        res.send(result ? 'success' : 'failure');
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AuthController;
}(app_controller_1.default));
exports.AuthController = AuthController;
