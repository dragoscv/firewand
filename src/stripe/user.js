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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = getCurrentUser;
exports.getCurrentUserSync = getCurrentUserSync;
exports.setUserDAO = setUserDAO;
var auth_1 = require("firebase/auth");
var init_1 = require("./init");
/**
 * Internal API for retrieving the currently signed in user. Rejects with "unauthenticated" if
 * the user is not signed in. Exposed for internal use.
 *
 * @internal
 */
function getCurrentUser(payments) {
    try {
        var uid = getCurrentUserSync(payments);
        return Promise.resolve(uid);
    }
    catch (err) {
        return Promise.reject(err);
    }
}
/**
 * Internal API for retrieving the currently signed in user. Throws "unauthenticated" if
 * the user is not signed in. Exposed for internal use.
 *
 * @internal
 */
function getCurrentUserSync(payments) {
    var dao = getOrInitUserDAO(payments);
    return dao.getCurrentUser();
}
var FirebaseAuthUserDAO = /** @class */ (function () {
    function FirebaseAuthUserDAO(app) {
        this.auth = (0, auth_1.getAuth)(app);
    }
    FirebaseAuthUserDAO.prototype.getCurrentUser = function () {
        var _a;
        var currentUser = (_a = this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid;
        if (!currentUser) {
            var newError = new init_1.StripePaymentsError("unauthenticated", "Failed to determine currently signed in user. User not signed in.");
            // console.error(newError);
            return "";
        }
        return currentUser;
    };
    return FirebaseAuthUserDAO;
}());
var USER_DAO_KEY = "user-dao";
function getOrInitUserDAO(payments) {
    var dao = payments.getComponent(USER_DAO_KEY);
    if (!dao) {
        dao = new FirebaseAuthUserDAO(payments.app);
        setUserDAO(payments, dao);
    }
    return dao;
}
/**
 * Internal API for registering a {@link UserDAO} instance with {@link StripePayments}.
 * Exported for testing.
 *
 * @internal
 */
function setUserDAO(payments, dao) {
    payments.setComponent(USER_DAO_KEY, dao);
}
