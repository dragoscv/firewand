"use strict";
/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripePaymentsError = exports.StripePayments = void 0;
exports.getStripePayments = getStripePayments;
var app_1 = require("firebase/app");
(0, app_1.registerVersion)("firestore-stripe-payments", "__VERSION__");
/**
 * Serves as the main entry point to this library. Initializes the client SDK,
 * and returns a handle object that can be passed into other APIs.
 *
 * @param app - A FirebaseApp instance initialized by the Firebase JS SDK.
 * @param options - Configuration options for the SDK.
 * @returns An instance of the StripePayments class.
 */
function getStripePayments(app, options) {
    return StripePayments.create(app, options);
}
/**
 * Holds the configuration and other state information of the SDK. An instance of this class
 * must be passed to almost all the other APIs of this library. Do not directly call the
 * constructor. Use the {@link getStripePayments} function to obtain an instance.
 */
var StripePayments = /** @class */ (function () {
    function StripePayments(app, options) {
        this.app = app;
        this.options = options;
        this.components = {};
    }
    /**
     * @internal
     */
    StripePayments.create = function (app, options) {
        return new StripePayments(app, options);
    };
    Object.defineProperty(StripePayments.prototype, "customersCollection", {
        /**
         * Name of the customers collection as configured in the extension.
         */
        get: function () {
            return this.options.customersCollection;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StripePayments.prototype, "productsCollection", {
        /**
         * Name of the products collection as configured in the extension.
         */
        get: function () {
            return this.options.productsCollection;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @internal
     */
    StripePayments.prototype.getComponent = function (key) {
        var dao = this.components[key];
        if (dao) {
            return dao;
        }
        return null;
    };
    /**
     * @internal
     */
    StripePayments.prototype.setComponent = function (key, dao) {
        this.components[key] = dao;
    };
    return StripePayments;
}());
exports.StripePayments = StripePayments;
/**
 * An error thrown by this SDK.
 */
var StripePaymentsError = /** @class */ (function (_super) {
    __extends(StripePaymentsError, _super);
    function StripePaymentsError(code, message, cause) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.message = message;
        _this.cause = cause;
        return _this;
    }
    return StripePaymentsError;
}(Error));
exports.StripePaymentsError = StripePaymentsError;
