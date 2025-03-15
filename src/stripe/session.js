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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATE_SESSION_TIMEOUT_MILLIS = void 0;
exports.createCheckoutSession = createCheckoutSession;
exports.setSessionDAO = setSessionDAO;
var firestore_1 = require("firebase/firestore");
var init_1 = require("./init");
var user_1 = require("./user");
var utils_1 = require("./utils");
function hasLineItems(params) {
    return "line_items" in params;
}
exports.CREATE_SESSION_TIMEOUT_MILLIS = 30 * 1000;
/**
 * Creates a new Stripe checkout session with the given parameters. Returned session contains a
 * session ID and a session URL that can be used to redirect the user to complete the checkout.
 * User must be currently signed in with Firebase Auth to call this API. If a timeout occurs
 * while waiting for the session to be created and acknowledged by Stripe, rejects with a
 * `deadline-exceeded` error. Default timeout duration is {@link CREATE_SESSION_TIMEOUT_MILLIS}.
 *
 * @param payments - A valid {@link StripePayments} object.
 * @param params - Parameters of the checkout session.
 * @param options - Optional settings to customize the behavior.
 * @returns Resolves with the created Stripe Session object.
 */
function createCheckoutSession(payments, params, options) {
    params = __assign({}, params);
    checkAndUpdateCommonParams(params);
    if (hasLineItems(params)) {
        checkLineItemParams(params);
    }
    else {
        checkPriceIdParams(params);
    }
    var timeoutMillis = getTimeoutMillis(options === null || options === void 0 ? void 0 : options.timeoutMillis);
    return (0, user_1.getCurrentUser)(payments).then(function (uid) {
        var dao = getOrInitSessionDAO(payments);
        return dao.createCheckoutSession(uid, params, timeoutMillis);
    });
}
function checkAndUpdateCommonParams(params) {
    var _a;
    if (typeof params.cancel_url !== "undefined") {
        (0, utils_1.checkNonEmptyString)(params.cancel_url, "cancel_url must be a non-empty string.");
    }
    else {
        params.cancel_url = window.location.href;
    }
    (_a = params.mode) !== null && _a !== void 0 ? _a : (params.mode = "subscription");
    if (typeof params.success_url !== "undefined") {
        (0, utils_1.checkNonEmptyString)(params.success_url, "success_url must be a non-empty string.");
    }
    else {
        params.success_url = window.location.href;
    }
}
function checkLineItemParams(params) {
    (0, utils_1.checkNonEmptyArray)(params.line_items, "line_items must be a non-empty array.");
}
function checkPriceIdParams(params) {
    (0, utils_1.checkNonEmptyString)(params.price, "price must be a non-empty string.");
    if (typeof params.quantity !== "undefined") {
        (0, utils_1.checkPositiveNumber)(params.quantity, "quantity must be a positive integer.");
    }
}
function getTimeoutMillis(timeoutMillis) {
    if (typeof timeoutMillis !== "undefined") {
        (0, utils_1.checkPositiveNumber)(timeoutMillis, "timeoutMillis must be a positive number.");
        return timeoutMillis;
    }
    return exports.CREATE_SESSION_TIMEOUT_MILLIS;
}
var FirestoreSessionDAO = /** @class */ (function () {
    function FirestoreSessionDAO(app, customersCollection) {
        this.customersCollection = customersCollection;
        this.firestore = (0, firestore_1.getFirestore)(app);
    }
    FirestoreSessionDAO.prototype.createCheckoutSession = function (uid, params, timeoutMillis) {
        return __awaiter(this, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addSessionDoc(uid, params)];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/, this.waitForSessionId(doc, timeoutMillis)];
                }
            });
        });
    };
    FirestoreSessionDAO.prototype.addSessionDoc = function (uid, params) {
        return __awaiter(this, void 0, void 0, function () {
            var sessions, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sessions = (0, firestore_1.collection)(this.firestore, this.customersCollection, uid, "checkout_sessions");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, firestore_1.addDoc)(sessions, params)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_1 = _a.sent();
                        throw new init_1.StripePaymentsError("internal", "Error while querying Firestore.", err_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FirestoreSessionDAO.prototype.waitForSessionId = function (doc, timeoutMillis) {
        var cancel;
        return new Promise(function (resolve, reject) {
            var timeout = setTimeout(function () {
                reject(new init_1.StripePaymentsError("deadline-exceeded", "Timeout while waiting for session response."));
            }, timeoutMillis);
            cancel = (0, firestore_1.onSnapshot)(doc.withConverter(SESSION_CONVERTER), function (snap) {
                var session = snap.data();
                if (hasSessionId(session)) {
                    clearTimeout(timeout);
                    resolve(session);
                }
            }, function (err) {
                clearTimeout(timeout);
                reject(new init_1.StripePaymentsError("internal", "Error while querying Firestore.", err));
            });
        }).finally(function () { return cancel(); });
    };
    return FirestoreSessionDAO;
}());
function hasSessionId(session) {
    return typeof (session === null || session === void 0 ? void 0 : session.id) !== "undefined";
}
var SESSION_CONVERTER = {
    toFirestore: function () {
        throw new Error("Not implemented for readonly Session type.");
    },
    fromFirestore: function (snapshot) {
        var _a = snapshot.data(), created = _a.created, sessionId = _a.sessionId, rest = __rest(_a, ["created", "sessionId"]);
        if (typeof sessionId !== "undefined") {
            return __assign(__assign({}, rest), { id: sessionId, created_at: toUTCDateString(created) });
        }
        return __assign({}, rest);
    },
};
function toUTCDateString(timestamp) {
    return timestamp.toDate().toUTCString();
}
var SESSION_DAO_KEY = "checkout-session-dao";
function getOrInitSessionDAO(payments) {
    var dao = payments.getComponent(SESSION_DAO_KEY);
    if (!dao) {
        dao = new FirestoreSessionDAO(payments.app, payments.customersCollection);
        setSessionDAO(payments, dao);
    }
    return dao;
}
/**
 * Internal API for registering a {@link SessionDAO} instance with {@link StripePayments}.
 * Exported for testing.
 *
 * @internal
 */
function setSessionDAO(payments, dao) {
    payments.setComponent(SESSION_DAO_KEY, dao);
}
