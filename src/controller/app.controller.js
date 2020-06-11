"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var AppController = /** @class */ (function () {
    function AppController(model) {
        this.model = model;
        this.find = this.find.bind(this);
        this.add = this.add.bind(this);
        this.modify = this.modify.bind(this);
    }
    AppController.prototype.add = function (payload) {
        return new this.model(payload).save();
    };
    AppController.prototype.modify = function (_id, payload) {
        return this.model.findByIdAndUpdate(_id, payload).exec();
    };
    AppController.prototype.remove = function (_id) {
        return this.model.findByIdAndRemove(_id).exec();
    };
    AppController.prototype.find = function (pre) {
        if (mongoose_1.Types.ObjectId.isValid(pre)) {
            return this.model.findById(pre);
        }
        return this.model.find(pre);
    };
    AppController.prototype._Error = function (error) {
        return error;
    };
    return AppController;
}());
exports.default = AppController;
//# sourceMappingURL=app.controller.js.map