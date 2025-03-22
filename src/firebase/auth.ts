/**
 * Firebase authentication functions.
 * @packageDocumentation
 */

import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
    onAuthStateChanged as _onAuthStateChanged,
    Auth,
    User,
    createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
    OAuthProvider,
    sendPasswordResetEmail as firebaseSendPasswordResetEmail,
    multiFactor,
    PhoneAuthProvider,
    PhoneMultiFactorGenerator,
    MultiFactorResolver,
    RecaptchaVerifier,
    ApplicationVerifier,
    getAuth
} from "@firebase/auth";
import { getReactNativePersistence as _getReactNativePersistence } from "@firebase/auth/react-native";

import { firebaseAuth } from "./fireabase.config";

/**
 * The Firebase authentication object.
 */
const auth: Auth = firebaseAuth;

/**
 * Calls the provided function when the user's sign-in state changes.
 * @param cb - The function to call when the user's sign-in state changes.
 * @returns A function to unsubscribe from the listener.
 */
export function onAuthStateChanged(cb: (user: any) => void) {
    return _onAuthStateChanged(auth, cb);
}

/**
 * Signs in the user with Google.
 */
export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Error signing in with Google", error);
    }
}

/**
 * Signs out the current user.
 * @returns A promise that resolves when the user is signed out.
 */
export async function signOut() {
    const auth = getAuth();
    try {
        return await auth.signOut();
    } catch (error) {
        console.error("Error signing out", error);
        throw error;
    }
}

/**
 * Gets the current user.
 * @returns The current user object or null if no user is signed in.
 */
export function currentUser() {
    const auth = getAuth();
    return auth.currentUser;
}

/**
 * Checks if the current user is an admin.
 * @returns A boolean indicating if the current user is an admin.
 */
export function isAdmin() {
    const currentUser: User | null = auth.currentUser;
    const admin = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    return currentUser?.email === admin;
}

/**
 * Signs in the user with email and password.
 * @param email - The user's email.
 * @param password - The user's password.
 */
export async function signInWithEmailAndPassword(email: string, password: string) {
    try {
        await firebaseSignInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error signing in with email and password", error);
        throw error;
    }
}

/**
 * Creates a new user with email and password.
 * @param email - The user's email.
 * @param password - The user's password.
 */
export async function createUserWithEmailAndPassword(email: string, password: string) {
    try {
        await firebaseCreateUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error creating user with email and password", error);
        throw error;
    }
}

/**
 * Sends a password reset email to the user.
 * @param email - The user's email.
 */
export async function sendPasswordResetEmail(email: string) {
    try {
        await firebaseSendPasswordResetEmail(auth, email);
    } catch (error) {
        console.error("Error sending password reset email", error);
        throw error;
    }
}

/**
 * Sets up reCAPTCHA for phone authentication.
 * @param container - The HTML element to render the reCAPTCHA widget.
 * @returns A RecaptchaVerifier instance.
 */
export function setupRecaptcha(container: HTMLElement): RecaptchaVerifier {
    const verifier = new RecaptchaVerifier(auth, container, {
        size: "invisible",
        callback: (response: string) => {
            console.log("reCAPTCHA solved", response);
        },
        "expired-callback": () => {
            console.log("reCAPTCHA expired");
        },
    });
    return verifier;
}

/**
 * Signs in the user with a phone number.
 * @param phoneNumber - The user's phone number.
 * @param appVerifier - The reCAPTCHA verifier.
 */
export async function signInWithPhoneNumber(phoneNumber: string, appVerifier: ApplicationVerifier) {
    try {
        const phoneProvider = new PhoneAuthProvider(auth);
        const confirmationResult = await phoneProvider.verifyPhoneNumber(phoneNumber, appVerifier);
        return confirmationResult;
    } catch (error) {
        console.error("Error signing in with phone number", error);
        throw error;
    }
}

/**
 * Verifies the phone number with the provided code.
 * @param confirmationResult - The confirmation result from signInWithPhoneNumber.
 * @param code - The verification code sent to the user's phone.
 */
export async function verifyPhoneNumber(confirmationResult: any, code: string) {
    try {
        const result = await confirmationResult.confirm(code);
        return result;
    } catch (error) {
        console.error("Error verifying phone number", error);
        throw error;
    }
}

/**
 * Gets the multi-factor resolver for the current user.
 * @returns The MultiFactorUser instance.
 */
export function getMultiFactorUser() {
    const user = auth.currentUser;
    if (user) {
        return multiFactor(user);
    }
    return null;
}

/**
 * Generates a phone multi-factor assertion.
 * @param phoneNumber - The user's phone number.
 * @returns The phone multi-factor info.
 */
export function generatePhoneMultiFactorAssertion(phoneNumber: string) {
    const user = auth.currentUser;
    if (user) {
        // PhoneMultiFactorGenerator has static methods that should be used
        return PhoneMultiFactorGenerator.assertion;
    }
    throw new Error("No user is currently signed in.");
}

/**
 * Signs in the user with a custom OAuth provider.
 * @param provider - The OAuth provider.
 */
export async function signInWithCustomOAuth(provider: OAuthProvider) {
    try {
        await signInWithRedirect(auth, provider);
    } catch (error) {
        console.error("Error signing in with custom OAuth", error);
        throw error;
    }
}

/**
 * Signs in the user with a custom OAuth provider using a popup.
 * @param provider - The OAuth provider.
 */
export async function signInWithCustomOAuthPopup(provider: OAuthProvider) {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Error signing in with custom OAuth popup", error);
        throw error;
    }
}

/**
 * Gets the current authentication state.
 * @returns The current authentication state.
 */
export function getAuthState() {
    const user = auth.currentUser;
    return { user };
}

/**
 * Gets the React Native persistence implementation for Firebase Auth
 * @param storage - The storage implementation (typically AsyncStorage)
 * @returns A persistence layer for Firebase Auth
 */
export const getReactNativePersistence = _getReactNativePersistence;



