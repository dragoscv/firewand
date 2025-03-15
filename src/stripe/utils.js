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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.newCheckoutSession = exports.stripePayments = void 0;
exports.checkNonEmptyString = checkNonEmptyString;
exports.checkPositiveNumber = checkPositiveNumber;
exports.checkNonEmptyArray = checkNonEmptyArray;
var _1 = require(".");
/**
 * Initializes Stripe payments with the given Firebase app and collections.
 *
 * @param firebaseApp - The Firebase app instance.
 * @param productsCollection - The name of the products collection (default is "products").
 * @param customersCollection - The name of the customers collection (default is "/customers").
 * @returns An instance of StripePayments.
 */
var stripePayments = function (firebaseApp, productsCollection, customersCollection) {
    if (productsCollection === void 0) { productsCollection = "products"; }
    if (customersCollection === void 0) { customersCollection = "/customers"; }
    return (0, _1.getStripePayments)(firebaseApp, {
        productsCollection: productsCollection,
        customersCollection: customersCollection,
    });
};
exports.stripePayments = stripePayments;
/**
 * Creates a new Stripe checkout session and redirects the user to the session URL.
 *
 * @param sessionConfig - Configuration object for the checkout session.
 * @param sessionConfig.firebaseApp - The Firebase app instance.
 * @param sessionConfig.priceId - The ID of the price to be used in the session.
 * @param sessionConfig.promoCode - (Optional) The promotion code to apply to the session.
 * @param sessionConfig.metadata - (Optional) Metadata to attach to the session.
 * @param sessionConfig.trial_period_days - (Optional) Number of trial period days for the subscription.
 * @param sessionConfig.payment_mode - (Optional) The payment mode for the session (e.g., subscription or payment).
 * @param sessionConfig.currency - The currency for the payment.
 * @param sessionConfig.priceValue - The value of the price.
 * @param sessionConfig.subscriptionName - The name of the subscription.
 *
 * @returns A promise that resolves when the session is created and the user is redirected.
 */
var newCheckoutSession = function (sessionConfig) { return __awaiter(void 0, void 0, void 0, function () {
    var firebaseApp, priceId, promoCode, metadata, trial_period_days, payment_mode, payments, paymentConfig, session;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                firebaseApp = sessionConfig.firebaseApp, priceId = sessionConfig.priceId, promoCode = sessionConfig.promoCode, metadata = sessionConfig.metadata, trial_period_days = sessionConfig.trial_period_days, payment_mode = sessionConfig.payment_mode;
                payments = (0, exports.stripePayments)(firebaseApp);
                paymentConfig = {
                    price: priceId,
                    allow_promotion_codes: true,
                    success_url: "".concat(window.location.href, "?paymentStatus=success&currency=").concat(sessionConfig.currency, "&priceValue=").concat(sessionConfig.priceValue, "&subscriptionName=").concat(sessionConfig.subscriptionName, "&priceId=").concat(priceId),
                    cancel_url: "".concat(window.location.href, "?paymentStatus=canceled"),
                };
                if (payment_mode) {
                    paymentConfig["mode"] = payment_mode;
                    paymentConfig["invoice_creation"] = true;
                }
                if (trial_period_days) {
                    paymentConfig["trial_period_days"] = trial_period_days;
                }
                if (promoCode) {
                    paymentConfig["promotion_code"] = promoCode;
                }
                if (metadata) {
                    paymentConfig["metadata"] = metadata;
                }
                return [4 /*yield*/, (0, _1.createCheckoutSession)(payments, paymentConfig)];
            case 1:
                session = _a.sent();
                window.location.assign(session.url);
                return [2 /*return*/];
        }
    });
}); };
exports.newCheckoutSession = newCheckoutSession;
function checkNonEmptyString(arg, message) {
    if (typeof arg !== "string" || arg === "") {
        throw new Error(message !== null && message !== void 0 ? message : "arg must be a non-empty string.");
    }
}
function checkPositiveNumber(arg, message) {
    if (typeof arg !== "number" || isNaN(arg) || arg <= 0) {
        throw new Error(message !== null && message !== void 0 ? message : "arg must be positive number.");
    }
}
function checkNonEmptyArray(arg, message) {
    if (!Array.isArray(arg) || arg.length === 0) {
        throw new Error(message !== null && message !== void 0 ? message : "arg must be a non-empty array.");
    }
}
