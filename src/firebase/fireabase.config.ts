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
import { initializeApp, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getMessaging, isSupported as isSupportedMessaging, Messaging } from "firebase/messaging";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getDatabase, Database, connectDatabaseEmulator } from "firebase/database";
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
export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const useEmulators = process.env.USE_EMULATORS === 'true' ? true : false;
const functionsRegion = process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_REGION || 'us-central1';

/**
 * Firebase app instance
 * @type {import('firebase/app').FirebaseApp}
 */
const firebaseApp = initializeApp(firebaseConfig);
// export const firebaseAdminApp = initializeAdminApp(adminConfig);

/**
 * Firestore database instance
 * @type {import('firebase/firestore').Firestore}
 */
const firestoreDB = getFirestore(firebaseApp);

if (process.env.NODE_ENV === 'development' && useEmulators) {
    connectFirestoreEmulator(firestoreDB, 'localhost', 8080);
}

/**
 * Firebase authentication instance
 * @type {import('firebase/auth').Auth}
 */
const firebaseAuth = getAuth(firebaseApp);
if (process.env.NODE_ENV === 'development' && useEmulators) {
    connectAuthEmulator(firebaseAuth, 'http://localhost:9099');
}

/**
 * Firebase storage instance
 * @type {import('firebase/storage').Storage}
 */
const firebaseStorage = getStorage(firebaseApp);
if (process.env.NODE_ENV === 'development' && useEmulators) {
    connectStorageEmulator(firebaseStorage, 'localhost', 9199);
}

/**
 * Firebase analytics instance
 * @type {Promise<import('firebase/analytics').Analytics|null>}
 */
const firebaseAnalytics = isSupported().then((isSupported) => {
    if (isSupported) {
        return getAnalytics(firebaseApp);
    }
    return null;
});


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
const firebaseMessaging: Promise<Messaging | null> = isSupportedMessaging().then((isSupported) => {
    if (isSupported) {
        return getMessaging(firebaseApp);
    }
    return null;
});

/**
 * Instance of Firebase Realtime Database initialized with the Firebase app.
 * 
 * This database instance can be used to read from or write to the database,
 * set up listeners for data changes, and perform other database operations.
 * 
 * @type {Database}
 * @see {@link https://firebase.google.com/docs/database/web/start|Firebase Realtime Database Documentation}
 */
const firebaseDB: Database = getDatabase(firebaseApp);
if (process.env.NODE_ENV === 'development' && useEmulators) {
    connectDatabaseEmulator(firebaseDB, 'localhost', 9080);
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
const currentFirebaseApp: FirebaseApp = getApp('[DEFAULT]');

/**
 * Firebase Functions instance configured to run in the functionsRegion or "us-central1" region.
 * This allows calling Cloud Functions deployed to the specified region.
 * 
 * @see {@link https://firebase.google.com/docs/functions/callable Cloud Functions documentation}
 */
const firebaseFunctions = getFunctions(firebaseApp, functionsRegion);
if (process.env.NODE_ENV === 'development' && useEmulators) {
    connectFunctionsEmulator(firebaseFunctions, 'localhost', 5001);
}


export {
    firestoreDB,
    firebaseAuth,
    firebaseStorage,
    firebaseAnalytics,
    firebaseMessaging,
    firebaseFunctions,
    firebaseDB,
    currentFirebaseApp
};

