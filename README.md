# Firewand

Firewand is a modular Firebase utility library for simplifying interactions with Firebase services such as Analytics, Auth, Firestore, Storage, and Stripe payments.  
{ // ...existing package info: version, author, license, etc. ... }

## Overview

Firewand centralizes Firebase functionalities into a single library. It exports all necessary Firebase helpers from the main entry point.

## Installation

To install Firewand, run:

```bash
npm install firewand
```

## Usage

In your project, import the services as needed:

```typescript
import {
  firebaseApp,
  firebaseAuth,
  firestoreDB,
  logAnalyticsEvent,
} from "firewand";
```

For example, using the authentication hook:

```typescript
import { useUserSession } from "firewand";

function App() {
  const { user, userDetails } = useUserSession();
  // ...existing code...
  return <div>{user ? `Welcome, ${user.email}` : "Sign in"}</div>;
}
```

Or logging an analytics event:

```typescript
import { logAnalyticsEvent } from "firewand";

logAnalyticsEvent("page_view", { page: "home" });
```

## Examples

- Exporting and initializing Firebase App:
  ```typescript
  import { firebaseApp } from "firewand";
  // Use firebaseApp to initialize your app further
  ```

## Contributing

Contributions welcome. Please refer to the guidelines in the repository for further details.

## License

Licensed under the MIT License.
