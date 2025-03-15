"use strict";
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
var globals_1 = require("@jest/globals");
var app_1 = require("../../firebase/app");
var subscription_1 = require("../../stripe/subscription");
globals_1.jest.mock('../../firebase/app');
describe('Stripe Subscriptions', function () {
    var mockPayments;
    beforeEach(function () {
        globals_1.jest.clearAllMocks();
        mockPayments = {
            app: app_1.firebaseApp,
            customersCollection: 'customers',
            productsCollection: 'products',
            getComponent: globals_1.jest.fn(),
            setComponent: globals_1.jest.fn(),
        };
    });
    afterEach(function () {
        globals_1.jest.restoreAllMocks();
    });
    describe('getCurrentUserSubscription', function () {
        it('should get subscription for current user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockSubscription, mockGetUser, mockGetSubscription, mockUserDAO, mockSubscriptionDAO, subscription;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockSubscription = {
                            id: 'sub_123',
                            status: 'active',
                            current_period_end: new Date().toUTCString(),
                            current_period_start: new Date().toUTCString(),
                            price: 'price_123',
                            prices: [{ product: 'prod_123', price: 'price_123' }],
                            product: 'prod_123',
                            quantity: 1,
                            role: 'premium',
                            metadata: {},
                            uid: 'user_123',
                            stripe_link: 'https://stripe.com/sub_123',
                            trial_end: null,
                            trial_start: null,
                            cancel_at_period_end: false,
                            created: new Date().toUTCString(),
                            ended_at: null,
                            cancel_at: null,
                            canceled_at: null
                        };
                        mockGetUser = globals_1.jest.fn().mockResolvedValue('user_123');
                        mockGetSubscription = globals_1.jest.fn()
                            .mockResolvedValue(mockSubscription);
                        mockUserDAO = {
                            getCurrentUser: mockGetUser
                        };
                        mockSubscriptionDAO = {
                            getSubscription: mockGetSubscription,
                            getSubscriptions: globals_1.jest.fn(),
                            onSubscriptionUpdate: globals_1.jest.fn()
                        };
                        // Setup the mocks to be returned in sequence
                        mockPayments.getComponent
                            .mockImplementation(function (key) {
                            if (key === 'user-dao') {
                                return mockUserDAO;
                            }
                            if (key === 'subscription-dao') {
                                return mockSubscriptionDAO;
                            }
                            return null;
                        });
                        return [4 /*yield*/, (0, subscription_1.getCurrentUserSubscription)(mockPayments, 'sub_123')];
                    case 1:
                        subscription = _a.sent();
                        expect(subscription).toEqual(mockSubscription);
                        expect(mockGetSubscription).toHaveBeenCalledWith('user_123', 'sub_123');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw error if subscription not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockGetUser, mockError, mockGetSubscription, mockUserDAO, mockSubscriptionDAO;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockGetUser = globals_1.jest.fn().mockResolvedValue('user_123');
                        mockError = new Error('Subscription not found');
                        mockGetSubscription = globals_1.jest.fn()
                            .mockRejectedValue(mockError);
                        mockUserDAO = {
                            getCurrentUser: mockGetUser
                        };
                        mockSubscriptionDAO = {
                            getSubscription: mockGetSubscription,
                            getSubscriptions: globals_1.jest.fn(),
                            onSubscriptionUpdate: globals_1.jest.fn()
                        };
                        mockPayments.getComponent
                            .mockImplementation(function (key) {
                            if (key === 'user-dao') {
                                return mockUserDAO;
                            }
                            if (key === 'subscription-dao') {
                                return mockSubscriptionDAO;
                            }
                            return null;
                        });
                        return [4 /*yield*/, expect((0, subscription_1.getCurrentUserSubscription)(mockPayments, 'invalid_sub'))
                                .rejects.toThrow('Subscription not found')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getCurrentUserSubscriptions', function () {
        it('should get all subscriptions for current user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockSubscriptions, mockGetUser, mockGetSubscriptions, mockUserDAO, mockSubscriptionDAO, subscriptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockSubscriptions = [{
                                id: 'sub_123',
                                status: 'active',
                                current_period_end: new Date().toUTCString(),
                                current_period_start: new Date().toUTCString(),
                                price: 'price_123',
                                prices: [{ product: 'prod_123', price: 'price_123' }],
                                product: 'prod_123',
                                quantity: 1,
                                role: 'premium',
                                metadata: {},
                                uid: 'user_123',
                                stripe_link: 'https://stripe.com/sub_123',
                                trial_end: null,
                                trial_start: null,
                                cancel_at_period_end: false,
                                created: new Date().toUTCString(),
                                ended_at: null,
                                cancel_at: null,
                                canceled_at: null
                            }];
                        mockGetUser = globals_1.jest.fn().mockResolvedValue('user_123');
                        mockGetSubscriptions = globals_1.jest.fn()
                            .mockResolvedValue(mockSubscriptions);
                        mockUserDAO = {
                            getCurrentUser: mockGetUser
                        };
                        mockSubscriptionDAO = {
                            getSubscription: globals_1.jest.fn(),
                            getSubscriptions: mockGetSubscriptions,
                            onSubscriptionUpdate: globals_1.jest.fn()
                        };
                        mockPayments.getComponent
                            .mockImplementation(function (key) {
                            if (key === 'user-dao') {
                                return mockUserDAO;
                            }
                            if (key === 'subscription-dao') {
                                return mockSubscriptionDAO;
                            }
                            return null;
                        });
                        return [4 /*yield*/, (0, subscription_1.getCurrentUserSubscriptions)(mockPayments)];
                    case 1:
                        subscriptions = _a.sent();
                        expect(subscriptions).toEqual(mockSubscriptions);
                        expect(mockGetSubscriptions).toHaveBeenCalledWith('user_123', {});
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('onCurrentUserSubscriptionUpdate', function () {
        it('should set up subscription update listener', function () {
            var mockOnUpdate = globals_1.jest.fn();
            var mockOnError = globals_1.jest.fn();
            var mockUnsubscribe = globals_1.jest.fn();
            var mockSnapshot = {
                subscriptions: [],
                changes: [],
                size: 0,
                empty: true
            };
            var mockGetCurrentUserSync = globals_1.jest.fn().mockReturnValue('user_123');
            var mockOnSubscriptionUpdate = globals_1.jest.fn()
                .mockImplementation(function (uid, callback) {
                callback(mockSnapshot);
                return mockUnsubscribe;
            });
            var mockUserDAO = {
                getCurrentUserSync: mockGetCurrentUserSync
            };
            var mockSubscriptionDAO = {
                getSubscription: globals_1.jest.fn(),
                getSubscriptions: globals_1.jest.fn(),
                onSubscriptionUpdate: mockOnSubscriptionUpdate
            };
            mockPayments.getComponent
                .mockImplementation(function (key) {
                if (key === 'user-dao') {
                    return mockUserDAO;
                }
                if (key === 'subscription-dao') {
                    return mockSubscriptionDAO;
                }
                return null;
            });
            var unsubscribe = (0, subscription_1.onCurrentUserSubscriptionUpdate)(mockPayments, mockOnUpdate, mockOnError);
            expect(unsubscribe).toBe(mockUnsubscribe);
            expect(mockOnSubscriptionUpdate).toHaveBeenCalledWith('user_123', mockOnUpdate, mockOnError);
            expect(mockOnUpdate).toHaveBeenCalledWith(mockSnapshot);
        });
    });
});
