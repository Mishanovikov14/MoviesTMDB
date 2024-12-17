import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../constants/Colors";
import { useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../lib/FirebaseConfig";
import { store, useAppDispatch, useAppSelector } from "../store/store";
import { Provider } from "react-redux";
import { clearUser, setUser } from "../store/auth/authSlice";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout() {
  const client = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <MainLayout />
      </QueryClientProvider>
    </Provider>
  );
}

export function MainLayout() {
  const dispatch = useAppDispatch();

  //--------------------------------------------
  //example of select usage
  // const user = useAppSelector(selectUser);
  //--------------------------------------------

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

        router.replace("/(tabs)/(movies)/movies");
      } else {
        dispatch(clearUser());

        router.replace("/login");
      }
    });
  };

  useEffect(() => {
    monitorAuthState();
  }, []);

  return (
    <>
      <StatusBar style="light" backgroundColor={Colors.DARK} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
