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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = getProduct;
exports.getProducts = getProducts;
exports.getPrice = getPrice;
exports.getPrices = getPrices;
exports.setProductDAO = setProductDAO;
var firestore_1 = require("@firebase/firestore");
var init_1 = require("./init");
var utils_1 = require("./utils");
/**
 * Retrieves a Stripe product from the database.
 *
 * @param payments - A valid {@link StripePayments} object.
 * @param productId - ID of the product to retrieve.
 * @param options - A set of options to customize the behavior.
 * @returns Resolves with a Stripe Product object if found. Rejects if the specified product ID
 *  does not exist.
 */
function getProduct(payments, productId, options) {
    (0, utils_1.checkNonEmptyString)(productId, "productId must be a non-empty string.");
    var dao = getOrInitProductDAO(payments);
    return dao.getProduct(productId).then(function (product) {
        if (options === null || options === void 0 ? void 0 : options.includePrices) {
            return getProductWithPrices(dao, product);
        }
        return product;
    });
}
/**
 * Retrieves a Stripe product from the database.
 *
 * @param payments - A valid {@link StripePayments} object.
 * @param productId - ID of the product to retrieve.
 * @param options - A set of options to customize the behavior.
 * @returns Resolves with an array of Stripe Product objects. May be empty.
 */
function getProducts(payments, options) {
    var dao = getOrInitProductDAO(payments);
    var _a = options !== null && options !== void 0 ? options : {}, includePrices = _a.includePrices, rest = __rest(_a, ["includePrices"]);
    return dao.getProducts(rest).then(function (products) {
        if (includePrices) {
            var productsWithPrices = products.map(function (product) { return getProductWithPrices(dao, product); });
            return Promise.all(productsWithPrices);
        }
        return products;
    });
}
function getProductWithPrices(dao, product) {
    return __awaiter(this, void 0, void 0, function () {
        var prices;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dao.getPrices(product.id)];
                case 1:
                    prices = _a.sent();
                    return [2 /*return*/, __assign(__assign({}, product), { prices: prices })];
            }
        });
    });
}
/**
 * Retrieves a Stripe price from the database.
 *
 * @param payments - A valid {@link StripePayments} object.
 * @param productId - ID of the product to which the price belongs.
 * @param priceId - ID of the price to retrieve.
 * @returns Resolves with a Stripe Price object if found. Rejects if the specified
 *   product ID or the price ID does not exist.
 */
function getPrice(payments, productId, priceId) {
    (0, utils_1.checkNonEmptyString)(productId, "productId must be a non-empty string.");
    (0, utils_1.checkNonEmptyString)(priceId, "priceId must be a non-empty string.");
    var dao = getOrInitProductDAO(payments);
    return dao.getPrice(productId, priceId);
}
/**
 * Retrieves all Stripe prices associated with the specified product.
 *
 * @param payments - A valid {@link StripePayments} object.
 * @param productId - ID of the product to which the prices belong.
 * @returns Resolves with an array of Stripe Price objects. Rejects if the specified
 *   product ID does not exist. If the product exists, but doesn't have any prices, resolves
 *   with the empty array.
 */
function getPrices(payments, productId) {
    (0, utils_1.checkNonEmptyString)(productId, "productId must be a non-empty string.");
    var dao = getOrInitProductDAO(payments);
    return dao.getPrices(productId, { assertProduct: true });
}
var PRODUCT_CONVERTER = {
    toFirestore: function () {
        throw new Error("Not implemented for readonly Product type.");
    },
    fromFirestore: function (snapshot) {
        return __assign(__assign({}, snapshot.data()), { id: snapshot.id, prices: [] });
    },
};
var PRICE_CONVERTER = {
    toFirestore: function () {
        throw new Error("Not implemented for readonly Price type.");
    },
    fromFirestore: function (snapshot) {
        var data = snapshot.data();
        return __assign(__assign({}, data), { id: snapshot.id, product: snapshot.ref.parent.parent.id });
    },
};
var FirestoreProductDAO = /** @class */ (function () {
    function FirestoreProductDAO(app, productsCollection) {
        this.productsCollection = productsCollection;
        this.firestore = (0, firestore_1.getFirestore)(app);
    }
    FirestoreProductDAO.prototype.getProduct = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var snap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProductSnapshotIfExists(productId)];
                    case 1:
                        snap = _a.sent();
                        return [2 /*return*/, snap.data()];
                }
            });
        });
    };
    FirestoreProductDAO.prototype.getProducts = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var querySnap, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProductSnapshots(options)];
                    case 1:
                        querySnap = _a.sent();
                        products = [];
                        querySnap.forEach(function (snap) {
                            products.push(snap.data());
                        });
                        return [2 /*return*/, products];
                }
            });
        });
    };
    FirestoreProductDAO.prototype.getPrice = function (productId, priceId) {
        return __awaiter(this, void 0, void 0, function () {
            var snap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPriceSnapshotIfExists(productId, priceId)];
                    case 1:
                        snap = _a.sent();
                        return [2 /*return*/, snap.data()];
                }
            });
        });
    };
    FirestoreProductDAO.prototype.getPrices = function (productId, options) {
        return __awaiter(this, void 0, void 0, function () {
            var querySnap, prices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(options === null || options === void 0 ? void 0 : options.assertProduct)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getProductSnapshotIfExists(productId)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.getPriceSnapshots(productId)];
                    case 3:
                        querySnap = _a.sent();
                        prices = [];
                        querySnap.forEach(function (snap) {
                            prices.push(snap.data());
                        });
                        return [2 /*return*/, prices];
                }
            });
        });
    };
    FirestoreProductDAO.prototype.getProductSnapshotIfExists = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var productRef, snapshot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productRef = (0, firestore_1.doc)(this.firestore, this.productsCollection, productId).withConverter(PRODUCT_CONVERTER);
                        return [4 /*yield*/, this.queryFirestore(function () {
                                return (0, firestore_1.getDoc)(productRef);
                            })];
                    case 1:
                        snapshot = _a.sent();
                        if (!snapshot.exists()) {
                            throw new init_1.StripePaymentsError("not-found", "No product found with the ID: ".concat(productId));
                        }
                        return [2 /*return*/, snapshot];
                }
            });
        });
    };
    FirestoreProductDAO.prototype.getProductSnapshots = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var productsQuery, constraints, _i, _a, filter;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        productsQuery = (0, firestore_1.collection)(this.firestore, this.productsCollection).withConverter(PRODUCT_CONVERTER);
                        constraints = [];
                        if (options === null || options === void 0 ? void 0 : options.activeOnly) {
                            constraints.push((0, firestore_1.where)("active", "==", true));
                        }
                        if (options === null || options === void 0 ? void 0 : options.where) {
                            for (_i = 0, _a = options.where; _i < _a.length; _i++) {
                                filter = _a[_i];
                                constraints.push(firestore_1.where.apply(void 0, filter));
                            }
                        }
                        if (typeof (options === null || options === void 0 ? void 0 : options.limit) !== "undefined") {
                            constraints.push((0, firestore_1.limit)(options.limit));
                        }
                        return [4 /*yield*/, this.queryFirestore(function () {
                                if (constraints.length > 0) {
                                    productsQuery = firestore_1.query.apply(void 0, __spreadArray([productsQuery], constraints, false));
                                }
                                return (0, firestore_1.getDocs)(productsQuery);
                            })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    FirestoreProductDAO.prototype.getPriceSnapshotIfExists = function (productId, priceId) {
        return __awaiter(this, void 0, void 0, function () {
            var priceRef, snapshot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        priceRef = (0, firestore_1.doc)(this.firestore, this.productsCollection, productId, "prices", priceId).withConverter(PRICE_CONVERTER);
                        return [4 /*yield*/, this.queryFirestore(function () {
                                return (0, firestore_1.getDoc)(priceRef);
                            })];
                    case 1:
                        snapshot = _a.sent();
                        if (!snapshot.exists()) {
                            throw new init_1.StripePaymentsError("not-found", "No price found with the product ID: ".concat(productId, " and price ID: ").concat(priceId));
                        }
                        return [2 /*return*/, snapshot];
                }
            });
        });
    };
    FirestoreProductDAO.prototype.getPriceSnapshots = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var pricesCollection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pricesCollection = (0, firestore_1.collection)(this.firestore, this.productsCollection, productId, "prices").withConverter(PRICE_CONVERTER);
                        return [4 /*yield*/, this.queryFirestore(function () { return (0, firestore_1.getDocs)(pricesCollection); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FirestoreProductDAO.prototype.queryFirestore = function (fn) {
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
    return FirestoreProductDAO;
}());
var PRODUCT_DAO_KEY = "product-dao";
function getOrInitProductDAO(payments) {
    var dao = payments.getComponent(PRODUCT_DAO_KEY);
    if (!dao) {
        dao = new FirestoreProductDAO(payments.app, payments.productsCollection);
        setProductDAO(payments, dao);
    }
    return dao;
}
/**
 * Internal API for registering a {@link ProductDAO} instance with {@link StripePayments}. Exported
 * for testing.
 *
 * @internal
 */
function setProductDAO(payments, dao) {
    payments.setComponent(PRODUCT_DAO_KEY, dao);
}
