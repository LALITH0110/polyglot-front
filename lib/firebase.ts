// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, increment, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWvn4C3wM4rjZIwyd5yytMS37uGlC_1jk",
  authDomain: "glotfile.firebaseapp.com",
  projectId: "glotfile",
  storageBucket: "glotfile.firebasestorage.app",
  messagingSenderId: "368552540536",
  appId: "1:368552540536:web:76203048215286d3f8708d",
  measurementId: "G-1FLFFCR797"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Reference to the counter document
const counterRef = doc(db, "counters", "polyglotCount");

// Function to increment the global counter
export const incrementPolyglotCounter = async (): Promise<void> => {
  try {
    await updateDoc(counterRef, {
      count: increment(1),
      lastUpdated: new Date()
    });
  } catch (error) {
    // If document doesn't exist, create it
    console.log("Creating counter document...");
    await setDoc(counterRef, {
      count: 1,
      lastUpdated: new Date()
    });
  }
};

// Function to get the current counter value
export const getPolyglotCounter = async (): Promise<number> => {
  try {
    const docSnap = await getDoc(counterRef);
    if (docSnap.exists()) {
      return docSnap.data().count || 0;
    } else {
      // Initialize counter if it doesn't exist
      await setDoc(counterRef, {
        count: 0,
        lastUpdated: new Date()
      });
      return 0;
    }
  } catch (error) {
    console.error("Error getting counter:", error);
    return 0;
  }
};

// Function to subscribe to real-time counter updates
import { onSnapshot } from "firebase/firestore";

export const subscribeToCounter = (callback: (count: number) => void) => {
  return onSnapshot(counterRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data().count || 0);
    } else {
      callback(0);
    }
  });
};
