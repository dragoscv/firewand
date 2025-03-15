"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCurrentUserSubscriptionUpdate = exports.getCurrentUserSubscriptions = exports.getCurrentUserSubscription = exports.getProducts = exports.getProduct = exports.getPrices = exports.getPrice = exports.onCurrentUserPaymentUpdate = exports.getCurrentUserPayments = exports.getCurrentUserPayment = exports.createCheckoutSession = exports.CREATE_SESSION_TIMEOUT_MILLIS = exports.getStripePayments = exports.StripePaymentsError = exports.StripePayments = void 0;
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
var init_1 = require("./init");
Object.defineProperty(exports, "StripePayments", { enumerable: true, get: function () { return init_1.StripePayments; } });
Object.defineProperty(exports, "StripePaymentsError", { enumerable: true, get: function () { return init_1.StripePaymentsError; } });
Object.defineProperty(exports, "getStripePayments", { enumerable: true, get: function () { return init_1.getStripePayments; } });
var session_1 = require("./session");
Object.defineProperty(exports, "CREATE_SESSION_TIMEOUT_MILLIS", { enumerable: true, get: function () { return session_1.CREATE_SESSION_TIMEOUT_MILLIS; } });
Object.defineProperty(exports, "createCheckoutSession", { enumerable: true, get: function () { return session_1.createCheckoutSession; } });
var payment_1 = require("./payment");
Object.defineProperty(exports, "getCurrentUserPayment", { enumerable: true, get: function () { return payment_1.getCurrentUserPayment; } });
Object.defineProperty(exports, "getCurrentUserPayments", { enumerable: true, get: function () { return payment_1.getCurrentUserPayments; } });
Object.defineProperty(exports, "onCurrentUserPaymentUpdate", { enumerable: true, get: function () { return payment_1.onCurrentUserPaymentUpdate; } });
var product_1 = require("./product");
Object.defineProperty(exports, "getPrice", { enumerable: true, get: function () { return product_1.getPrice; } });
Object.defineProperty(exports, "getPrices", { enumerable: true, get: function () { return product_1.getPrices; } });
Object.defineProperty(exports, "getProduct", { enumerable: true, get: function () { return product_1.getProduct; } });
Object.defineProperty(exports, "getProducts", { enumerable: true, get: function () { return product_1.getProducts; } });
var subscription_1 = require("./subscription");
Object.defineProperty(exports, "getCurrentUserSubscription", { enumerable: true, get: function () { return subscription_1.getCurrentUserSubscription; } });
Object.defineProperty(exports, "getCurrentUserSubscriptions", { enumerable: true, get: function () { return subscription_1.getCurrentUserSubscriptions; } });
Object.defineProperty(exports, "onCurrentUserSubscriptionUpdate", { enumerable: true, get: function () { return subscription_1.onCurrentUserSubscriptionUpdate; } });
__exportStar(require("./utils"), exports);
