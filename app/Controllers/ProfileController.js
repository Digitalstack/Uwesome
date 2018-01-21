"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var express_1 = require("express");
var Door_1 = require("../../core/Door");
var UserModel_1 = require("../../app/Models/UserModel");
var Notify_1 = require("../../core/Notify");
var ProfileController = /** @class */ (function () {
    function ProfileController() {
        this.router = express_1.Router();
        this.routes;
    }
    ProfileController.prototype.profileGradient = function (type) {
        return new Promise(function (resolve, reject) {
            switch (type) {
                case 'DEFAULT':
                    resolve('background: linear-gradient(to top right, #2980b9, #1abc9c)');
                    break;
                case 'FLOW':
                    '';
                    break;
                case 'PINKY':
                    '';
            }
        });
    };
    ProfileController.prototype.routes = function () {
        var _this = this;
        this.router.get('/user/:username', Door_1.default.authRequired, function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var pUser, isCurrentUserProfile, data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, UserModel_1.default.findBy('username', req.params.username)];
                    case 1:
                        pUser = _b.sent();
                        if (!pUser) return [3 /*break*/, 4];
                        isCurrentUserProfile = pUser.token == req.session.user;
                        _a = {
                            pageTitle: 'profile %s',
                            req: req,
                            csrfToken: req.csrfToken()
                        };
                        return [4 /*yield*/, Door_1.default.getUser(req)];
                    case 2:
                        _a.user = _b.sent(),
                            _a.pUser = pUser,
                            _a.Notify = Notify_1.default;
                        return [4 /*yield*/, this.profileGradient(pUser.profile_gradient)];
                    case 3:
                        data = (_a.profileGradient = _b.sent(),
                            _a.isCurrentUserProfile = isCurrentUserProfile,
                            _a);
                        res.render('user/index', data);
                        return [3 /*break*/, 5];
                    case 4:
                        res.redirect('back');
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    return ProfileController;
}());
exports.ProfileController = ProfileController;
var ProfileRoutes = new ProfileController();
ProfileRoutes.routes();
exports.default = ProfileRoutes.router;
