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