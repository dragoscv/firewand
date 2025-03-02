# Firewand

Firewand is a modular Firebase utility library for simplifying interactions with Firebase services such as Analytics, Auth, Firestore, Storage, and Stripe payments. It provides a set of hooks and functions for common Firebase operations and integrates with Stripe for handling payments and subscriptions. Firewand is designed to be used with React applications and Next.js projects. It also supports Firebase Emulators for local development and testing.

[![npm version](https://badge.fury.io/js/firewand.svg)](https://badge.fury.io/js/firewand)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Exported Utilities](#exported-utilities)
  - [Firebase Core Services](#firebase-core-services)
  - [Authentication Utilities](#authentication-utilities)
  - [Firestore Utilities](#firestore-utilities)
  - [Stripe Payment Integration](#stripe-payment-integration)
- [Usage Examples](#usage-examples)
  - [Basic Firebase App Usage](#basic-firebase-app-usage)
  - [User Authentication](#user-authentication)
  - [Firestore Operations](#firestore-operations)
  - [Analytics Event Logging](#analytics-event-logging)
  - [Stripe Payments Integration](#stripe-payments-integration)
    - [Initialize Stripe Payments](#initialize-stripe-payments)
    - [Create a Checkout Session](#create-a-checkout-session)
    - [Manage Subscriptions](#manage-subscriptions)
    - [Products and Pricing](#products-and-pricing)
- [FirewandProvider Component](#firewandprovider-component)
- [Contributing](#contributing)
- [License](#license)

## Overview

Firewand centralizes Firebase functionalities into a single library. It exports all necessary Firebase helpers from the main entry point.

## Installation

To install Firewand, run:

```bash
npm install firewand
```

## Environment Configuration

Create a `.env` file in your project root with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
NEXT_PUBLIC_FIREBASE_FUNCTIONS_REGION=us-central1

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
NEXT_PUBLIC_STRIPE_SECRET_KEY=your_stripe_secret_key

# Firebase Cloud Messaging
NEXT_PUBLIC_VAPID_KEY=your_vapid_key

# Development Configuration
USE_EMULATORS=false
```

## Exported Utilities

Firewand exports the following utilities:

### Firebase Core Services

```typescript
import {
  firebaseApp, // Firebase App instance
  firestoreDB, // Firestore database instance
  firebaseAuth, // Firebase Authentication instance
  firebaseStorage, // Firebase Storage instance
  firebaseAnalytics, // Firebase Analytics instance
  firebaseMessaging, // Firebase Cloud Messaging instance
  firebaseFunctions, // Firebase Cloud Functions instance
  firebaseDB, // Firebase Realtime Database instance
} from "firewand";
```

### Authentication Utilities

```typescript
import {
  useUserSession, // Hook for accessing authenticated user and details
  onAuthStateChanged, // Auth state change listener
  signInWithGoogle, // Google sign-in method
  signOut, // Sign out method
} from "firewand";
```

### Firestore Utilities

```typescript
import {
  getCollection, // Get all documents from a collection
  getDocument, // Get a specific document
  updateDocument, // Update a document
  addDocument, // Add a new document
  setDocument, // Set document data
  setDocumentMerge, // Set document data with merge option
  deleteDocument, // Delete a document
  onSnapshotWithCollection, // Real-time collection listener
  onSnapshotWithDocument, // Real-time document listener
} from "firewand";
```

### Stripe Payment Integration

```typescript
import {
  stripePayments, // Initialize Stripe payments
  createCheckoutSession, // Create a checkout session
  getCurrentUserSubscriptions, // Get user subscriptions
  onCurrentUserSubscriptionUpdate, // Listen for subscription updates
  getProducts, // Get available products
  getPrices, // Get prices for a product
} from "firewand";
```

## Usage Examples

### Basic Firebase App Usage

```typescript
import { firebaseApp, firestoreDB } from "firewand";

// Use firebaseApp to initialize other services
// Use firestoreDB for database operations
```

### User Authentication

```typescript
import { useUserSession } from "firewand";

function App() {
  const { user, userDetails } = useUserSession();

  return (
    <div>
      {user ? `Welcome, ${user.email}` : "Sign in"}
      {userDetails && <p>User role: {userDetails.role}</p>}
    </div>
  );
}
```

### Firestore Operations

```typescript
import { getCollection, addDocument } from "firewand";

// Get all documents from a collection
const fetchUsers = async () => {
  const users = await getCollection("users");
  console.log(users);
};

// Add a new document
const addUser = async (userData) => {
  await addDocument("users", userData);
};
```

### Analytics Event Logging

```typescript
import { logAnalyticsEvent } from "firewand";

// Log a custom event
logAnalyticsEvent("button_click", { button_id: "login", page: "home" });
```

### Stripe Payments Integration

Firewand provides extensive Stripe integration capabilities for handling subscriptions, payments, and products.

#### Initialize Stripe Payments

```typescript
import { stripePayments, firebaseApp } from "firewand";

const payments = stripePayments(firebaseApp);
```

#### Create a Checkout Session

```typescript
import { createCheckoutSession, stripePayments, firebaseApp } from "firewand";

const createSubscription = async (priceId) => {
  const payments = stripePayments(firebaseApp);

  const session = await createCheckoutSession(payments, {
    price: priceId,
    success_url: window.location.origin + "/success",
    cancel_url: window.location.origin + "/cancel",
    mode: "subscription",
  });

  // Redirect to checkout
  window.location.assign(session.url);
};
```

#### Manage Subscriptions

```typescript
import {
  getCurrentUserSubscriptions,
  onCurrentUserSubscriptionUpdate,
  stripePayments,
  firebaseApp,
} from "firewand";

// Get user's subscriptions
const fetchSubscriptions = async () => {
  const payments = stripePayments(firebaseApp);
  const subscriptions = await getCurrentUserSubscriptions(payments);
  return subscriptions;
};

// Listen for subscription changes
const subscribeToSubscriptionChanges = () => {
  const payments = stripePayments(firebaseApp);

  return onCurrentUserSubscriptionUpdate(
    payments,
    (snapshot) => {
      console.log("Subscriptions updated:", snapshot.subscriptions);
    },
    (error) => {
      console.error("Subscription error:", error);
    }
  );
};
```

#### Products and Pricing

```typescript
import { getProducts, getPrices, stripePayments, firebaseApp } from "firewand";

// Get all products with prices
const fetchProducts = async () => {
  const payments = stripePayments(firebaseApp);
  const products = await getProducts(payments, { includePrices: true });
  return products;
};

// Get prices for a specific product
const fetchPrices = async (productId) => {
  const payments = stripePayments(firebaseApp);
  const prices = await getPrices(payments, productId);
  return prices;
};
```

## FirewandProvider Component

Firewand includes a context provider component for accessing shared state:

```tsx
import { FirewandProvider, FirewandContext } from "firewand";

function MyApp() {
  return (
    <FirewandProvider app="your-app-name">
      <MainComponent />
    </FirewandProvider>
  );
}

function MainComponent() {
  const { user, userDetails, products, userSubscriptions, isSubscribed } =
    useContext(FirewandContext);

  // Use the context values
}
```

## Contributing

Contributions are welcome. Please refer to the contribution guidelines in the repository for further details.

## License

Licensed under the MIT License.
