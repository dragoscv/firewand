import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
// import { firebaseApp } from '@/utils/firebase/app'
import { onAuthStateChanged } from '../firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { firestoreDB } from '../firebase/fireabase.config'

/**
 * Custom hook to get the current user session from Firebase Authentication.
 * @returns An object containing the current user session.
 */
/**
 * A custom React hook that manages user authentication state and user details.
 * 
 * This hook uses Firebase Authentication to track the current user's authentication state
 * and fetches additional user details from Firestore when a user is authenticated.
 * 
 * @returns An object containing:
 *  - user: The current Firebase Auth user object or null if not authenticated
 *  - userDetails: Additional user information from Firestore or null if not available
 * 
 * @example
 * ```tsx
 * const { user, userDetails } = useUserSession();
 * 
 * if (user) {
 *   console.log("User is signed in:", user.displayName);
 *   console.log("User details:", userDetails);
 * } else {
 *   console.log("User is not signed in");
 * }
 * ```
 */
export function useUserSession() {
    const [user, setUser] = useState<User | null>(null)
    const [userDetails, setUserDetails] = useState<any>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser)
            } else {
                setUser(null)
            }
        })

        return () => unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (user) {
            const getUserDetails = async () => {
                const userDoc = await getDoc(doc(firestoreDB, 'users', user.uid))
                setUserDetails(userDoc.data())
            }

            getUserDetails()
        }
    }, [user])



    return { user, userDetails }
}