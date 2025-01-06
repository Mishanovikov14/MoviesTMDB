import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import * as firebaseAuth from "firebase/auth";

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "movie-tmdb-fecb9.firebaseapp.com",
  projectId: "movie-tmdb-fecb9",
  storageBucket: "movie-tmdb-fecb9.firebasestorage.app",
  messagingSenderId: "669428009978",
  appId: "1:669428009978:web:e3397191cd0d45760cf243",
  measurementId: "G-129L0YBERM",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: reactNativePersistence(AsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// const analytics = getAnalytics(FIREBASE_APP);
