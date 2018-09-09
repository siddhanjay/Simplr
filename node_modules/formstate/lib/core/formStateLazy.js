"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var mobx_1 = require("mobx");
var types_1 = require("./types");
/**
 * Makes it easier to work with dynamically maintained array
 */
var FormStateLazy = (function () {
    function FormStateLazy(
        /** It is a function as fields can change over time */
        getFields) {
        var _this = this;
        this.getFields = getFields;
        this.validating = false;
        this._validators = [];
        this.validators = function () {
            var validators = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                validators[_i] = arguments[_i];
            }
            _this._validators = validators;
            return _this;
        };
        this.enableAutoValidation = function () {
            _this.getFields().forEach(function (x) { return x.enableAutoValidation(); });
        };
        this._error = '';
    }
    Object.defineProperty(FormStateLazy.prototype, "$", {
        get: function () {
            return this.getFields();
        },
        enumerable: true,
        configurable: true
    });
    FormStateLazy.prototype.validate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var values, fieldsResult, done, error, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validating = true;
                        values = this.getFields();
                        return [4 /*yield*/, Promise.all(values.map(function (value) { return value.validate(); }))];
                    case 1:
                        fieldsResult = _a.sent();
                        done = mobx_1.runInAction(function () {
                            if (fieldsResult.some(function (f) { return f.hasError; })) {
                                _this.validating = false;
                                return true;
                            }
                            return false;
                        });
                        if (done)
                            return [2 /*return*/, { hasError: true }];
                        return [4 /*yield*/, types_1.applyValidators(this.$, this._validators || [])];
                    case 2:
                        error = _a.sent();
                        res = mobx_1.runInAction(function () {
                            if (error != _this._error) {
                                _this._error = error;
                            }
                            _this.validating = false;
                            var hasError = !!error;
                            if (hasError) {
                                return { hasError: true };
                            }
                            return { hasError: false, value: _this.$ };
                        });
                        return [2 /*return*/, res];
                }
            });
        });
    };
    Object.defineProperty(FormStateLazy.prototype, "hasError", {
        /**
         * Does any field or form have an error
         */
        get: function () {
            return this.hasFieldError || this.hasFormError;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormStateLazy.prototype, "hasFieldError", {
        /**
         * Does any field have an error
         */
        get: function () {
            return this.getFields().some(function (f) { return f.hasError; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormStateLazy.prototype, "hasFormError", {
        /**
         * Does form level validation have an error
         */
        get: function () {
            return !!this._error;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Call it when you are `reinit`ing child fields
     */
    FormStateLazy.prototype.clearFormError = function () {
        this._error = '';
    };
    Object.defineProperty(FormStateLazy.prototype, "fieldError", {
        /**
         * Error from some sub field if any
         */
        get: function () {
            var subItemWithError = this.getFields().find(function (f) { return !!f.hasError; });
            return subItemWithError ? subItemWithError.error : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormStateLazy.prototype, "formError", {
        /**
         * Error from form if any
         */
        get: function () {
            return this._error;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormStateLazy.prototype, "error", {
        /**
         * The first error from any sub (if any) or form error
         */
        get: function () {
            return this.fieldError || this.formError;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormStateLazy.prototype, "showFormError", {
        /**
         * You should only show the form error if there are no field errors
         */
        get: function () {
            return !this.hasFieldError && this.hasFormError;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.computed
    ], FormStateLazy.prototype, "$", null);
    __decorate([
        mobx_1.observable
    ], FormStateLazy.prototype, "validating", void 0);
    __decorate([
        mobx_1.action
    ], FormStateLazy.prototype, "validators", void 0);
    __decorate([
        mobx_1.action
    ], FormStateLazy.prototype, "validate", null);
    __decorate([
        mobx_1.action
    ], FormStateLazy.prototype, "enableAutoValidation", void 0);
    __decorate([
        mobx_1.observable
    ], FormStateLazy.prototype, "_error", void 0);
    __decorate([
        mobx_1.computed
    ], FormStateLazy.prototype, "hasError", null);
    __decorate([
        mobx_1.computed
    ], FormStateLazy.prototype, "hasFieldError", null);
    __decorate([
        mobx_1.computed
    ], FormStateLazy.prototype, "hasFormError", null);
    __decorate([
        mobx_1.action
    ], FormStateLazy.prototype, "clearFormError", null);
    __decorate([
        mobx_1.computed
    ], FormStateLazy.prototype, "fieldError", null);
    __decorate([
        mobx_1.computed
    ], FormStateLazy.prototype, "formError", null);
    __decorate([
        mobx_1.computed
    ], FormStateLazy.prototype, "error", null);
    __decorate([
        mobx_1.computed
    ], FormStateLazy.prototype, "showFormError", null);
    return FormStateLazy;
}());
exports.FormStateLazy = FormStateLazy;
