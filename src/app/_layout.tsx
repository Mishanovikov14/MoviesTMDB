import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../constants/Colors";
import { useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../lib/FirebaseConfig";
import { store, useAppDispatch } from "../store/store";
import { Provider } from "react-redux";
import { clearUser, setUser } from "../store/auth/authSlice";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CustomAlert from "../components/ui/CustomAlert";

export default function RootLayout() {
  const client = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <MainLayout />
      </QueryClientProvider>
      <CustomAlert />
    </Provider>
  );
}

export function MainLayout() {
  const dispatch = useAppDispatch();

  const monitorAuthState = () => {
    onAuthStateChanged(FIREBASE_AUTH, async (user: User | null) => {
      if (user) {
        const userInfo = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };

        dispatch(setUser(userInfo));
      } else {
        dispatch(clearUser());
      }
    });
  };

  useEffect(() => {
    monitorAuthState();
  }, []);

  return (
    <>
      <StatusBar style="light" backgroundColor={Colors.DARK} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.DARK },
          headerTintColor: Colors.PRIMARY,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="index" options={{ title: "Sign In" }} />
        <Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
