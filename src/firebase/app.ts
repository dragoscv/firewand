import { initializeApp, getApp } from 'firebase/app';
import { firebaseConfig } from './fireabase.config';

initializeApp(firebaseConfig)
const app = getApp();

/**
 * Export of the initialized Firebase application instance.
 * 
 * This is the main entry point for accessing Firebase services.
 * The app instance can be used to access various Firebase services 
 * like authentication, database, storage, etc.
 * 
 * @exports {FirebaseApp} firebaseApp - The Firebase application instance
 */
export const firebaseApp = app;