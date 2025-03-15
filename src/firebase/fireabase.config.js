"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentFirebaseApp = exports.firebaseDB = exports.firebaseFunctions = exports.firebaseMessaging = exports.firebaseAnalytics = exports.firebaseStorage = exports.firebaseAuth = exports.firestoreDB = exports.firebaseConfig = void 0;
/**
 * Firebase configuration and initialization module.
 *
 * This module handles initialization of Firebase services and connects to emulators
 * when running in development mode with emulators enabled.
 *
 * @module firebase/firebase.config
 *
 * @exports firebaseConfig - Configuration object for Firebase initialization
 * @exports firestoreDB - Firestore database instance
 * @exports firebaseAuth - Firebase authentication instance
 * @exports firebaseStorage - Firebase storage instance
 * @exports firebaseAnalytics - Promise resolving to Firebase analytics instance or null if not supported
 * @exports firebaseMessaging - Promise resolving to Firebase messaging instance or null if not supported
 * @exports firebaseFunctions - Firebase cloud functions instance
 * @exports firebaseDB - Firebase realtime database instance
 * @exports currentFirebaseApp - Reference to the default Firebase app instance
 */
// import { initializeApp as initializeAdminApp } from 'firebase-admin';
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
var auth_1 = require("firebase/auth");
var storage_1 = require("firebase/storage");
var analytics_1 = require("firebase/analytics");
var messaging_1 = require("firebase/messaging");
var functions_1 = require("firebase/functions");
var database_1 = require("firebase/database");
/**
 * Firebase configuration object
 * @typedef {Object} FirebaseConfig
 * @property {string} apiKey - Firebase API key
 * @property {string} authDomain - Firebase authentication domain
 * @property {string} projectId - Firebase project ID
 * @property {string} storageBucket - Firebase storage bucket
 * @property {string} messagingSenderId - Firebase messaging sender ID
 * @property {string} appId - Firebase app ID
 * @property {string} measurementId - Firebase measurement ID
 */
exports.firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL
};
var useEmulators = process.env.USE_EMULATORS === 'true' ? true : false;
var functionsRegion = process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_REGION || 'us-central1';
/**
 * Firebase app instance
 * @type {import('firebase/app').FirebaseApp}
 */
var firebaseApp = (0, app_1.initializeApp)(exports.firebaseConfig);
// export const firebaseAdminApp = initializeAdminApp(adminConfig);
/**
 * Firestore database instance
 * @type {import('firebase/firestore').Firestore}
 */
var firestoreDB = (0, firestore_1.getFirestore)(firebaseApp);
exports.firestoreDB = firestoreDB;
if (process.env.NODE_ENV === 'development' && useEmulators) {
    (0, firestore_1.connectFirestoreEmulator)(firestoreDB, 'localhost', 8080);
}
/**
 * Firebase authentication instance
 * @type {import('firebase/auth').Auth}
 */
var firebaseAuth = (0, auth_1.getAuth)(firebaseApp);
exports.firebaseAuth = firebaseAuth;
if (process.env.NODE_ENV === 'development' && useEmulators) {
    (0, auth_1.connectAuthEmulator)(firebaseAuth, 'http://localhost:9099');
}
/**
 * Firebase storage instance
 * @type {import('firebase/storage').Storage}
 */
var firebaseStorage = (0, storage_1.getStorage)(firebaseApp);
exports.firebaseStorage = firebaseStorage;
if (process.env.NODE_ENV === 'development' && useEmulators) {
    (0, storage_1.connectStorageEmulator)(firebaseStorage, 'localhost', 9199);
}
/**
 * Firebase analytics instance
 * @type {Promise<import('firebase/analytics').Analytics|null>}
 */
var firebaseAnalytics = (0, analytics_1.isSupported)().then(function (isSupported) {
    if (isSupported) {
        return (0, analytics_1.getAnalytics)(firebaseApp);
    }
    return null;
});
exports.firebaseAnalytics = firebaseAnalytics;
/**
 * Asynchronously initializes Firebase Messaging if it's supported by the browser.
 *
 * @remarks
 * This variable holds a Promise that resolves to a Firebase Messaging instance or null.
 * It first checks if the browser supports Firebase Messaging, and if so, initializes
 * the Messaging service with the Firebase application.
 *
 * @returns A Promise that resolves to a Firebase Messaging instance if messaging is supported,
 * or null if it's not supported in the current browser environment.
 */
var firebaseMessaging = (0, messaging_1.isSupported)().then(function (isSupported) {
    if (isSupported) {
        return (0, messaging_1.getMessaging)(firebaseApp);
    }
    return null;
});
exports.firebaseMessaging = firebaseMessaging;
/**
 * Instance of Firebase Realtime Database initialized with the Firebase app.
 *
 * This database instance can be used to read from or write to the database,
 * set up listeners for data changes, and perform other database operations.
 *
 * @type {Database}
 * @see {@link https://firebase.google.com/docs/database/web/start|Firebase Realtime Database Documentation}
 */
var firebaseDB = (0, database_1.getDatabase)(firebaseApp);
exports.firebaseDB = firebaseDB;
if (process.env.NODE_ENV === 'development' && useEmulators) {
    (0, database_1.connectDatabaseEmulator)(firebaseDB, 'localhost', 9080);
}
/**
 * Represents the current Firebase application instance.
 *
 * This constant holds a reference to the default Firebase app instance
 * that has been initialized in the application. It's retrieved using
 * Firebase's getApp method with the '[DEFAULT]' app name.
 *
 * @type {FirebaseApp} The Firebase application instance
 */
var currentFirebaseApp = (0, app_1.getApp)('[DEFAULT]');
exports.currentFirebaseApp = currentFirebaseApp;
/**
 * Firebase Functions instance configured to run in the functionsRegion or "us-central1" region.
 * This allows calling Cloud Functions deployed to the specified region.
 *
 * @see {@link https://firebase.google.com/docs/functions/callable Cloud Functions documentation}
 */
var firebaseFunctions = (0, functions_1.getFunctions)(firebaseApp, functionsRegion);
exports.firebaseFunctions = firebaseFunctions;
if (process.env.NODE_ENV === 'development' && useEmulators) {
    (0, functions_1.connectFunctionsEmulator)(firebaseFunctions, 'localhost', 5001);
}
