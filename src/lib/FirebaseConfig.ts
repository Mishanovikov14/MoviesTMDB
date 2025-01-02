import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import * as firebaseAuth from 'firebase/auth';
        
    const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAajGbIFYkaAIy-PcRiTqN0nBCzR7e2nwI",
  authDomain: "movie-tmdb-fecb9.firebaseapp.com",
  projectId: "movie-tmdb-fecb9",
  storageBucket: "movie-tmdb-fecb9.firebasestorage.app",
  messagingSenderId: "669428009978",
  appId: "1:669428009978:web:e3397191cd0d45760cf243",
  measurementId: "G-129L0YBERM"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {persistence: reactNativePersistence(AsyncStorage)});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// const analytics = getAnalytics(FIREBASE_APP);