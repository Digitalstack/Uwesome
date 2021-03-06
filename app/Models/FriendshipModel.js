"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = require("../../core/Model");
var FriendshipModel = /** @class */ (function (_super) {
    __extends(FriendshipModel, _super);
    function FriendshipModel() {
        return _super.call(this, 'friendship') || this;
    }
    return FriendshipModel;
}(Model_1.Model));
exports.FriendshipModel = FriendshipModel;
exports.default = new FriendshipModel;
