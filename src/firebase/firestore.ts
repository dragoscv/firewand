import {
    collection,
    onSnapshot,
    query,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    orderBy,
    Timestamp,
    runTransaction,
    where,
    addDoc,
    setDoc
} from "firebase/firestore";

import { firestoreDB } from "./fireabase.config";

export const getCollection = async (collectionName: string) => {
    const q = query(collection(firestoreDB, collectionName));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
        return {
            id: doc.id, ...doc
                .data()
        };
    });
    return data;
};

export const getDocument = async (collectionName: string, docId: string) => {
    const docRef = doc(firestoreDB, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};

export const updateDocument = async (
    collectionName: string,
    docId: string,
    data: any
) => {
    const docRef = doc(firestoreDB, collectionName, docId);
    await updateDoc(docRef, data);
};

export const addDocument = async (collectionName: string, data: any) => {
    await addDoc(collection(firestoreDB, collectionName), data);
};

export const setDocument = async (collectionName: string, docId: string, data: any) => {
    const docRef = doc(firestoreDB, collectionName, docId);
    await setDoc(docRef, data);
};

export const setDocumentMerge = async (collectionName: string, docId: string, data: any) => {
    const docRef = doc(firestoreDB, collectionName, docId);
    await setDoc(docRef, data, { merge: true });
};

export const deleteDocument = async (collectionName: string, docId: string) => {
    const docRef = doc(firestoreDB, collectionName, docId);
    await updateDoc(docRef, { deletedAt: Timestamp.now() });
};



export const getCollectionWithOrder = async (
    collectionName: string,
    field: string,
    order: "asc" | "desc"
) => {
    const q = query(
        collection(firestoreDB, collectionName),
        orderBy(field, order)
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });
    return data;
};

export const getCollectionWithFilter = async (
    collectionName: string,
    field: string,
    operator: any,
    value: any
) => {
    const q = query(
        collection(firestoreDB, collectionName),
        where(field, operator, value)
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
        return {
            id: doc.id, ...doc
                .data()
        };
    });
    return data;
};

export const getCollectionWithFilterAndOrder = async (
    collectionName: string,
    field: string,
    operator: any,
    value: any,
    orderField: string,
    order: "asc" | "desc"
) => {
    const q = query(
        collection(firestoreDB, collectionName),
        where(field, operator, value),
        orderBy(orderField, order)
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
        return {
            id: doc.id, ...doc
                .data()
        };
    });
    return data;
};

export const runTransactionWithDocument = async (
    collectionName: string,
    docId: string,
    transactionFunction: any
) => {
    const docRef = doc(firestoreDB, collectionName, docId);
    await runTransaction(firestoreDB, async (transaction) => {
        const doc = await transaction.get(docRef);
        const data = doc.data();
        transactionFunction(transaction, data);
    });
};

export const onSnapshotWithCollection = (
    collectionName: string,
    callback: any
) => {
    const q = query(collection(firestoreDB, collectionName));
    onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        callback(data);
    });
};

export const onSnapshotWithDocument = (
    collectionName: string,
    docId: string,
    callback: any
) => {
    const docRef = doc(firestoreDB, collectionName, docId);
    onSnapshot(docRef, (doc) => {
        callback({ id: doc.id, ...doc.data() });
    });
};

export const onSnapshotWithOrder = (
    collectionName: string,
    field: string,
    order: "asc" | "desc",
    callback: any
) => {
    const q = query(
        collection(firestoreDB, collectionName),
        orderBy(field, order)
    );
    onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        callback(data);
    });
};

export const onSnapshotWithFilter = (
    collectionName: string,
    field: string,
    operator: any,
    value: any,
    callback: any
) => {
    const q = query(
        collection(firestoreDB, collectionName),
        where(field, operator, value)
    );
    onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        callback(data);
    });
};

export const onSnapshotWithFilterAndOrder = (
    collectionName: string,
    field: string,
    operator: any,
    value: any,
    orderField: string,
    order: "asc" | "desc",
    callback: any
) => {
    const q = query(
        collection(firestoreDB, collectionName),
        where(field, operator, value),
        orderBy(orderField, order)
    );
    onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        callback(data);
    });
};