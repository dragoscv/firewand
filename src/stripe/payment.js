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
exports.getCurrentUserPayment = getCurrentUserPayment;
exports.getCurrentUserPayments = getCurrentUserPayments;
exports.onCurrentUserPaymentUpdate = onCurrentUserPaymentUpdate;
exports.setPaymentDAO = setPaymentDAO;
var firestore_1 = require("@firebase/firestore");
var init_1 = require("./init");
var user_1 = require("./user");
var utils_1 = require("./utils");
/**
 * Retrieves an existing Stripe payment for the currently signed in user from the database.
 *
 * @param payments - A valid {@link StripePayments} object.
 * @param subscriptionId - ID of the payment to retrieve.
 * @returns Resolves with a Payment object if found. Rejects if the specified payment ID
 *  does not exist, or if the user is not signed in.
 */
function getCurrentUserPayment(payments, paymentId) {
    (0, utils_1.checkNonEmptyString)(paymentId, "paymentId must be a non-empty string.");
    return (0, user_1.getCurrentUser)(payments).then(function (uid) {
        var dao = getOrInitPaymentDAO(payments);
        return dao.getPayment(uid, paymentId);
    });
}
function getCurrentUserPayments(payments, options) {
    var queryOptions = {};
    if (typeof (options === null || options === void 0 ? void 0 : options.status) !== "undefined") {
        queryOptions.status = getStatusAsArray(options.status);
    }
    return (0, user_1.getCurrentUser)(payments).then(function (uid) {
        var dao = getOrInitPaymentDAO(payments);
        return dao.getPayments(uid, queryOptions);
    });
}
/**
 * Registers a listener to receive payment update events for the currently signed in
 * user. If the user is not signed in throws an `unauthenticated` error, and no listener is
 * registered.
 *
 * Upon successful registration, the `onUpdate` callback will fire once with
 * the current state of all the payments. From then onwards, each update to a payment
 * will fire the `onUpdate` callback with the latest state of the payments.
 *
 * @param payments - A valid {@link StripePayments} object.
 * @param onUpdate - A callback that will fire whenever the current user's payments
 *   are updated.
 * @param onError - A callback that will fire whenever an error occurs while listening to
 *   payment updates.
 * @returns A function that can be called to cancel and unregister the listener.
 */
function onCurrentUserPaymentUpdate(payments, onUpdate, onError) {
    var uid = (0, user_1.getCurrentUserSync)(payments);
    var dao = getOrInitPaymentDAO(payments);
    return dao.onPaymentUpdate(uid, onUpdate, onError);
}
function getStatusAsArray(status) {
    if (typeof status === "string") {
        return [status];
    }
    (0, utils_1.checkNonEmptyArray)(status, "status must be a non-empty array.");
    return status;
}
var PAYMENT_CONVERTER = {
    toFirestore: function () {
        throw new Error("Not implemented for readonly Payment type.");
    },
    fromFirestore: function (snapshot) {
        var _a;
        var data = snapshot.data();
        var refs = data.prices;
        var prices = refs.map(function (priceRef) {
            return {
                product: priceRef.parent.parent.id,
                price: priceRef.id,
            };
        });
        return {
            amount: data.amount,
            amount_capturable: data.amount_capturable,
            amount_received: data.amount_received,
            created: toUTCDateString(data.created),
            currency: data.currency,
            customer: data.customer,
            description: data.description,
            id: snapshot.id,
            invoice: data.invoice,
            metadata: (_a = data.metadata) !== null && _a !== void 0 ? _a : {},
            payment_method_types: data.payment_method_types,
            prices: prices,
            status: data.status,
            uid: snapshot.ref.parent.parent.id,
        };
    },
};
function toUTCDateString(seconds) {
    var date = new Date(seconds * 1000);
    return date.toUTCString();
}
var PAYMENTS_COLLECTION = "payments";
var FirestorePaymentDAO = /** @class */ (function () {
    function FirestorePaymentDAO(app, customersCollection) {
        this.customersCollection = customersCollection;
        this.firestore = (0, firestore_1.getFirestore)(app);
    }
    FirestorePaymentDAO.prototype.getPayment = function (uid, paymentId) {
        return __awaiter(this, void 0, void 0, function () {
            var snap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPaymentSnapshotIfExists(uid, paymentId)];
                    case 1:
                        snap = _a.sent();
                        return [2 /*return*/, snap.data()];
                }
            });
        });
    };
    FirestorePaymentDAO.prototype.getPayments = function (uid, options) {
        return __awaiter(this, void 0, void 0, function () {
            var querySnap, payments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPaymentSnapshots(uid, options === null || options === void 0 ? void 0 : options.status)];
                    case 1:
                        querySnap = _a.sent();
                        payments = [];
                        querySnap.forEach(function (snap) {
                            payments.push(snap.data());
                        });
                        return [2 /*return*/, payments];
                }
            });
        });
    };
    FirestorePaymentDAO.prototype.onPaymentUpdate = function (uid, onUpdate, onError) {
        var payments = (0, firestore_1.collection)(this.firestore, this.customersCollection, uid, PAYMENTS_COLLECTION).withConverter(PAYMENT_CONVERTER);
        return (0, firestore_1.onSnapshot)(payments, function (querySnap) {
            var snapshot = {
                payments: [],
                changes: [],
                size: querySnap.size,
                empty: querySnap.empty,
            };
            querySnap.forEach(function (snap) {
                snapshot.payments.push(snap.data());
            });
            querySnap.docChanges().forEach(function (change) {
                snapshot.changes.push({
                    type: change.type,
                    payment: change.doc.data(),
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
    FirestorePaymentDAO.prototype.getPaymentSnapshotIfExists = function (uid, paymentId) {
        return __awaiter(this, void 0, void 0, function () {
            var paymentRef, snapshot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paymentRef = (0, firestore_1.doc)(this.firestore, this.customersCollection, uid, PAYMENTS_COLLECTION, paymentId).withConverter(PAYMENT_CONVERTER);
                        return [4 /*yield*/, this.queryFirestore(function () {
                                return (0, firestore_1.getDoc)(paymentRef);
                            })];
                    case 1:
                        snapshot = _a.sent();
                        if (!snapshot.exists()) {
                            throw new init_1.StripePaymentsError("not-found", "No payment found with the ID: ".concat(paymentId, " for user: ").concat(uid));
                        }
                        return [2 /*return*/, snapshot];
                }
            });
        });
    };
    FirestorePaymentDAO.prototype.getPaymentSnapshots = function (uid, status) {
        return __awaiter(this, void 0, void 0, function () {
            var paymentsQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paymentsQuery = (0, firestore_1.collection)(this.firestore, this.customersCollection, uid, PAYMENTS_COLLECTION).withConverter(PAYMENT_CONVERTER);
                        if (status) {
                            paymentsQuery = (0, firestore_1.query)(paymentsQuery, (0, firestore_1.where)("status", "in", status));
                        }
                        return [4 /*yield*/, this.queryFirestore(function () { return (0, firestore_1.getDocs)(paymentsQuery); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FirestorePaymentDAO.prototype.queryFirestore = function (fn) {
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
    return FirestorePaymentDAO;
}());
var PAYMENT_DAO_KEY = "payment-dao";
function getOrInitPaymentDAO(payments) {
    var dao = payments.getComponent(PAYMENT_DAO_KEY);
    if (!dao) {
        dao = new FirestorePaymentDAO(payments.app, payments.customersCollection);
        setPaymentDAO(payments, dao);
    }
    return dao;
}
/**
 * Internal API for registering a {@link PaymentDAO} instance with {@link StripePayments}.
 * Exported for testing.
 *
 * @internal
 */
function setPaymentDAO(payments, dao) {
    payments.setComponent(PAYMENT_DAO_KEY, dao);
}
