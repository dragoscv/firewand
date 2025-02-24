import { initializeApp, getApp } from 'firebase/app';
import { firebaseConfig } from './fireabase.config';

initializeApp(firebaseConfig)
const app = getApp();

export const firebaseApp = app;