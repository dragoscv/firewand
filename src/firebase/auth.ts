import { Auth, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { firebaseApp } from './app.js';

// Initialize and export firebaseAuth only for web environments
// export let firebaseAuth: Auth = getAuth(firebaseApp);

// export const firebaseAuth = getAuth(firebaseApp);


/**
 * Signs in the user with Google.
 */
export async function signInWithGoogle(firebaseAuth: Auth) {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(firebaseAuth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

/**
 * Signs out the user.
 */
export async function signOutUser(firebaseAuth: Auth) {
  try {
    await signOut(firebaseAuth);
  } catch (error) {
    console.error("Error signing out", error);
  }
}
