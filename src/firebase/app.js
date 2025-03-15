"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseApp = void 0;
var app_1 = require("firebase/app");
var fireabase_config_1 = require("./fireabase.config");
(0, app_1.initializeApp)(fireabase_config_1.firebaseConfig);
var app = (0, app_1.getApp)();
/**
 * Export of the initialized Firebase application instance.
 *
 * This is the main entry point for accessing Firebase services.
 * The app instance can be used to access various Firebase services
 * like authentication, database, storage, etc.
 *
 * @exports {FirebaseApp} firebaseApp - The Firebase application instance
 */
exports.firebaseApp = app;
