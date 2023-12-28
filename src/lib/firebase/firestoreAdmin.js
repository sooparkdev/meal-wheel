import { db } from '@/lib/firebase/firebaseAdmin';

export const checkAndAddDocument = async (collectionName, docId, data) => {
  try {
    const docRef = db.collection(collectionName).doc(docId);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      await docRef.set(data);
    }
    return docRef;
  } catch (error) {
    console.error("Error while checking and adding document:", error);
    throw error; 
  }
}; // this might not be needed - 좀 더 두고 나중에 제거

export const setDocumentWithId = async (collectionName, docId, data) => {
  try {
    const docRef = db.collection(collectionName).doc(docId);
    await docRef.set(data);
    return docRef;
  } catch (error) {
    console.error("Error setting document with ID:", error);
    throw error;
  }
};

export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await db.collection(collectionName).add(data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = db.collection(collectionName).doc(docId);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      return docSnapshot.data();
    } else {
      return null; // Document does not exist
    }
  } catch (error) {
    console.error("Error reading document:", error);
    throw error;
  }
};

export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = db.collection(collectionName).doc(docId);
    await docRef.update(data);
    return true;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

export const removeDocument = async (collectionName, docId) => {
  try {
    const docRef = db.collection(collectionName).doc(docId);
    await docRef.delete();
    return true;
  } catch (error) {
    console.error("Error removing document:", error);
    throw error;
  }
};












// import firebase from "@/lib/firebase/firebaseClient"; //come back to this and ask chat gpt
// import {
//   getFirestore,
//   collection,
//   doc,
//   addDoc,
//   getDoc,
//   updateDoc,
//   deleteDoc,
// } from "firebase/firestore";

// const db = getFirestore(firebase);

// export const checkAndAddDocument = async (collectionName, docId, data) => {
//   const docRef = doc(db, collectionName, docId);
//   const docSnapshot = await getDoc(docRef);

//   if (!docSnapshot.exists()) {
//     await setDoc(docRef, data);
//   }

//   return docRef;
// };

// export const addDocument = async (collectionName, data) => {
//   try {
//     const docRef = await addDoc(collection(db, collectionName), data);
//     return docRef.id;
//   } catch (error) {
//     console.error("Error adding document:", error);
//     throw error;
//   }
// };

// export const getDocument = async (collectionName, docId) => {
//   try {
//     const docRef = doc(db, collectionName, docId);
//     const docSnapshot = await getDoc(docRef);

//     if (docSnapshot.exists()) {
//       return docSnapshot.data();
//     } else {
//       return null; // Document does not exist
//     }
//   } catch (error) {
//     console.error("Error reading document:", error);
//     throw error;
//   }
// };

// export const updateDocument = async (collectionName, docId, data) => {
//   try {
//     const docRef = doc(db, collectionName, docId);
//     await updateDoc(docRef, data);
//     return true;
//   } catch (error) {
//     console.error("Error updating document:", error);
//     throw error;
//   }
// };

// export const removeDocument = async (collectionName, docId) => {
//   try {
//     const docRef = doc(db, collectionName, docId);
//     await deleteDoc(docRef);
//     return true;
//   } catch (error) {
//     console.error("Error removing document:", error);
//     throw error;
//   }
// };
