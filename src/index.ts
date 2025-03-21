// Import specific modules first to avoid circular dependencies
import {
    StripePayments,
    StripePaymentsError,
    getStripePayments,
    CREATE_SESSION_TIMEOUT_MILLIS,
    createCheckoutSession,
    getCurrentUserPayment as getStripeUserPaymentInternal,
    getCurrentUserPayments as getStripeUserPaymentsInternal,
    onCurrentUserPaymentUpdate as onStripeUserPaymentUpdateInternal,
    getPrice,
    getPrices,
    getProduct,
    getProducts,
    getCurrentUserSubscription,
    getCurrentUserSubscriptions,
    onCurrentUserSubscriptionUpdate,
    stripePayments
} from "./stripe";

import {
    BTPPayments,
    BTPPaymentsError,
    getBTPPayments,
    BTPEnvironment,
    createPayment,
    getCurrentUserPayment as getBTPUserPaymentInternal,
    getCurrentUserPayments as getBTPUserPaymentsInternal,
    onCurrentUserPaymentUpdate as onBTPUserPaymentUpdateInternal,
    updatePaymentStatus,
    PaymentType,
    PaymentProduct,
    Currency,
    TransactionStatus,
    initiateSimplePayment,
    BTPProvider,
    useBTP
} from "./btpay";

// Export Firebase related functionality
export * from "./firebase/analytics";
export * from "./firebase/app";
export * from "./firebase/auth";
export {
    firebaseConfig,
    firestoreDB,
    firebaseAuth,
    getFirebaseAuthRN,
    firebaseStorage,
    firebaseAnalytics,
    firebaseMessaging,
    firebaseFunctions,
    firebaseDB,
    currentFirebaseApp
} from "./firebase/fireabase.config";
export * from "./firebase/firestore";
export * from "./firebase/storage";
export * from "./hooks/auth";

// Export Stripe with renamed functions to avoid conflicts
export {
    StripePayments,
    StripePaymentsError,
    getStripePayments,
    CREATE_SESSION_TIMEOUT_MILLIS,
    createCheckoutSession,
    getPrice,
    getPrices,
    getProduct,
    getProducts,
    getCurrentUserSubscription,
    getCurrentUserSubscriptions,
    onCurrentUserSubscriptionUpdate,
    stripePayments
};

// Re-export renamed Stripe functions
export const getStripeUserPayment = getStripeUserPaymentInternal;
export const getStripeUserPayments = getStripeUserPaymentsInternal;
export const onStripeUserPaymentUpdate = onStripeUserPaymentUpdateInternal;

// Export BTPay with renamed functions to avoid conflicts
export {
    BTPPayments,
    BTPPaymentsError,
    getBTPPayments,
    BTPEnvironment,
    createPayment,
    updatePaymentStatus,
    PaymentType,
    PaymentProduct,
    Currency,
    TransactionStatus,
    initiateSimplePayment,
    BTPProvider,
    useBTP
};

// Re-export renamed BTPay functions
export const getBTPUserPayment = getBTPUserPaymentInternal;
export const getBTPUserPayments = getBTPUserPaymentsInternal;
export const onBTPUserPaymentUpdate = onBTPUserPaymentUpdateInternal;

export * from "./provider";

// Re-export types
export * from "./types/basic";
export * from "./types/app";
export * from "./types/chat";
export * from "./types/post";
export * from "./types/user";

export {
    getReactNativePersistence,
} from './firebase/auth';