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


const firebaseMessaging: Promise<Messaging | null> = isSupportedMessaging().then((isSupported) => {
    if (isSupported) {
        return getMessaging(firebaseApp);
    }
    return null;
});

const firebaseDB: Database = getDatabase(firebaseApp);
if (process.env.NODE_ENV === 'development' && useEmulators) {
    connectDatabaseEmulator(firebaseDB, 'localhost', 9080);
}



const currentFirebaseApp: FirebaseApp = getApp('[DEFAULT]');

const firebaseFunctions = getFunctions(firebaseApp, "us-central1");
if (process.env.NODE_ENV === 'development' && useEmulators) {
    connectFunctionsEmulator(firebaseFunctions, 'localhost', 5001);
}

// export const firebaseFunctions = getFunctions(firebaseApp, "europe-west1");

// if (process.env.NODE_ENV === 'development') {
//     connectAuthEmulator(firebaseAuth, 'http://localhost:9099');
//     connectFirestoreEmulator(firestoreDB, 'localhost', 8090);
//     connectStorageEmulator(firebaseStorage, 'localhost', 9199);
//     connectDatabaseEmulator(firebaseDB, 'localhost', 9080);
//     connectFunctionsEmulator(firebaseFunctions, 'localhost', 5001);
// }


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

