import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../constants/Colors";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../lib/FirebaseConfig";
import { store } from "../state/store";
import {Provider} from "react-redux";

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("Auth state change: ", user);

      //TODO: Add logic for global state to show correct screen if user is logged in
      setUser(user);
    });
  }, []);
  
  return (
    <Provider store={store}>
      <StatusBar style="light" backgroundColor={Colors.DARK} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
