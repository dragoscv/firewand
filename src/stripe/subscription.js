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
exports.getCurrentUserSubscription = getCurrentUserSubscription;
exports.getCurrentUserSubscriptions = getCurrentUserSubscriptions;
exports.onCurrentUserSubscriptionUpdate = onCurrentUserSubscriptionUpdate;
exports.setSubscriptionDAO = setSubscriptionDAO;
var firestore_1 = require("firebase/firestore");
var init_1 = require("./init");
var user_1 = require("./user");
var utils_1 = require("./utils");
/**
 * Retrieves an existing Stripe subscription for the currently signed in user from the database.
 *
 * @param payments - A valid {@link StripePayments} object.
 * @param subscriptionId - ID of the subscription to retrieve.
 * @returns Resolves with a Subscription object if found. Rejects if the specified subscription ID
 *  does not exist, or if the user is not signed in.
 */
function getCurrentUserSubscription(payments, subscriptionId) {
    (0, utils_1.checkNonEmptyString)(subscriptionId, "subscriptionId must be a non-empty string.");
    return (0, user_1.getCurrentUser)(payments).then(function (uid) {
        var dao = getOrInitSubscriptionDAO(payments);
        return dao.getSubscription(uid, subscriptionId);
    });
}
/**
 * Retrieves existing Stripe subscriptions for the currently signed in user from the database.
 *
 * @param payments - A valid {@link StripePayments} object.
 * @param options - A set of options to customize the behavior.
 * @returns Resolves with an array of Stripe subscriptions. May be empty.
 */
function getCurrentUserSubscriptions(payments, options) {
    var queryOptions = {};
    if (typeof (options === null || options === void 0 ? void 0 : options.status) !== "undefined") {
        queryOptions.status = getStatusAsArray(options.status);
    }
    return (0, user_1.getCurrentUser)(payments).then(function (uid) {
        var dao = getOrInitSubscriptionDAO(payments);
        return dao.getSubscriptions(uid, queryOptions);
    });
}
/**
 * Registers a listener to receive subscription update events for the currently signed in
 * user. If the user is not signed in throws an `unauthenticated` error, and no listener is
 * registered.
 *
 * Upon successful registration, the `onUpdate` callback will fire once with
 * the current state of all the subscriptions. From then onwards, each update to a subscription
 * will fire the `onUpdate` callback with the latest state of the subscriptions.
 *
 * @param payments - A valid {@link StripePayments} object.
 * @param onUpdate - A callback that will fire whenever the current user's subscriptions
 *   are updated.
 * @param onError - A callback that will fire whenever an error occurs while listening to
 *   subscription updates.
 * @returns A function that can be called to cancel and unregister the listener.
 */
function onCurrentUserSubscriptionUpdate(payments, onUpdate, onError) {
    var uid = (0, user_1.getCurrentUserSync)(payments);
    var dao = getOrInitSubscriptionDAO(payments);
    return dao.onSubscriptionUpdate(uid, onUpdate, onError);
}
function getStatusAsArray(status) {
    if (typeof status === "string") {
        return [status];
    }
    (0, utils_1.checkNonEmptyArray)(status, "status must be a non-empty array.");
    return status;
}
var SUBSCRIPTION_CONVERTER = {
    toFirestore: function () {
        throw new Error("Not implemented for readonly Subscription type.");
    },
    fromFirestore: function (snapshot) {
        var _a, _b, _c;
        var data = snapshot.data();
        var refs = data.prices;
        var prices = refs.map(function (priceRef) {
            return {
                product: priceRef.parent.parent.id,
                price: priceRef.id,
            };
        });
        return {
            cancel_at: toNullableUTCDateString(data.cancel_at),
            cancel_at_period_end: data.cancel_at_period_end,
            canceled_at: toNullableUTCDateString(data.canceled_at),
            created: toUTCDateString(data.created),
            current_period_start: toUTCDateString(data.current_period_start),
            current_period_end: toUTCDateString(data.current_period_end),
            ended_at: toNullableUTCDateString(data.ended_at),
            id: snapshot.id,
            metadata: (_a = data.metadata) !== null && _a !== void 0 ? _a : {},
            price: data.price.id,
            prices: prices,
            product: data.product.id,
            quantity: (_b = data.quantity) !== null && _b !== void 0 ? _b : null,
            role: (_c = data.role) !== null && _c !== void 0 ? _c : null,
            status: data.status,
            stripe_link: data.stripeLink,
            trial_end: toNullableUTCDateString(data.trial_end),
            trial_start: toNullableUTCDateString(data.trial_start),
            uid: snapshot.ref.parent.parent.id,
        };
    },
};
var SUBSCRIPTIONS_COLLECTION = "subscriptions";
function toNullableUTCDateString(timestamp) {
    if (timestamp === null) {
        return null;
    }
    return toUTCDateString(timestamp);
}
function toUTCDateString(timestamp) {
    return timestamp.toDate().toUTCString();
}
var FirestoreSubscriptionDAO = /** @class */ (function () {
    function FirestoreSubscriptionDAO(app, customersCollection) {
        this.customersCollection = customersCollection;
        this.firestore = (0, firestore_1.getFirestore)(app);
    }
    FirestoreSubscriptionDAO.prototype.getSubscription = function (uid, subscriptionId) {
        return __awaiter(this, void 0, void 0, function () {
            var snap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSubscriptionSnapshotIfExists(uid, subscriptionId)];
                    case 1:
                        snap = _a.sent();
                        return [2 /*return*/, snap.data()];
                }
            });
        });
    };
    FirestoreSubscriptionDAO.prototype.getSubscriptions = function (uid, options) {
        return __awaiter(this, void 0, void 0, function () {
            var querySnap, subscriptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSubscriptionSnapshots(uid, options === null || options === void 0 ? void 0 : options.status)];
                    case 1:
                        querySnap = _a.sent();
                        subscriptions = [];
                        querySnap.forEach(function (snap) {
                            subscriptions.push(snap.data());
                        });
                        return [2 /*return*/, subscriptions];
                }
            });
        });
    };
    FirestoreSubscriptionDAO.prototype.onSubscriptionUpdate = function (uid, onUpdate, onError) {
        var subscriptions = (0, firestore_1.collection)(this.firestore, this.customersCollection, uid, SUBSCRIPTIONS_COLLECTION).withConverter(SUBSCRIPTION_CONVERTER);
        return (0, firestore_1.onSnapshot)(subscriptions, function (querySnap) {
            var snapshot = {
                subscriptions: [],
                changes: [],
                size: querySnap.size,
                empty: querySnap.empty,
            };
            querySnap.forEach(function (snap) {
                snapshot.subscriptions.push(snap.data());
            });
            querySnap
                .docChanges()
                .forEach(function (change) {
                snapshot.changes.push({
                    type: change.type,
                    subscription: change.doc.data(),
                });
            });
            onUpdate(snapshot);
        }, function (err) {
            if (onError) {
                var arg = new init_1.StripePaymentsError("internal", "Error while listening to database updates: ".concat(err.message), err);
                onError(arg);
            }
        });
    };
    FirestoreSubscriptionDAO.prototype.getSubscriptionSnapshotIfExists = function (uid, subscriptionId) {
        return __awaiter(this, void 0, void 0, function () {
            var subscriptionRef, snapshot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subscriptionRef = (0, firestore_1.doc)(this.firestore, this.customersCollection, uid, SUBSCRIPTIONS_COLLECTION, subscriptionId).withConverter(SUBSCRIPTION_CONVERTER);
                        return [4 /*yield*/, this.queryFirestore(function () { return (0, firestore_1.getDoc)(subscriptionRef); })];
                    case 1:
                        snapshot = _a.sent();
                        if (!snapshot.exists()) {
                            throw new init_1.StripePaymentsError("not-found", "No subscription found with the ID: ".concat(subscriptionId, " for user: ").concat(uid));
                        }
                        return [2 /*return*/, snapshot];
                }
            });
        });
    };
    FirestoreSubscriptionDAO.prototype.getSubscriptionSnapshots = function (uid, status) {
        return __awaiter(this, void 0, void 0, function () {
            var subscriptionsQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subscriptionsQuery = (0, firestore_1.collection)(this.firestore, this.customersCollection, uid, SUBSCRIPTIONS_COLLECTION).withConverter(SUBSCRIPTION_CONVERTER);
                        if (status) {
                            subscriptionsQuery = (0, firestore_1.query)(subscriptionsQuery, (0, firestore_1.where)("status", "in", status));
                        }
                        return [4 /*yield*/, this.queryFirestore(function () { return (0, firestore_1.getDocs)(subscriptionsQuery); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FirestoreSubscriptionDAO.prototype.queryFirestore = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fn()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        throw new init_1.StripePaymentsError("internal", "Unexpected error while querying Firestore", error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return FirestoreSubscriptionDAO;
}());
var SUBSCRIPTION_DAO_KEY = "subscription-dao";
function getOrInitSubscriptionDAO(payments) {
    var dao = payments.getComponent(SUBSCRIPTION_DAO_KEY);
    if (!dao) {
        dao = new FirestoreSubscriptionDAO(payments.app, payments.customersCollection);
        setSubscriptionDAO(payments, dao);
    }
    return dao;
}
/**
 * Internal API for registering a {@link SubscriptionDAO} instance with {@link StripePayments}.
 * Exported for testing.
 *
 * @internal
 */
function setSubscriptionDAO(payments, dao) {
    payments.setComponent(SUBSCRIPTION_DAO_KEY, dao);
}
