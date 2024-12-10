import { Redirect, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../constants/Colors";
import { useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../lib/FirebaseConfig";
import { store, useAppDispatch, useAppSelector } from "../store/store";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearUser } from "../store/auth/authSlice";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <MainLayout />
    </Provider>
  );
}

export function MainLayout() {
  //TODO: session loading
  const dispatch = useAppDispatch();

  //--------------------------------------------
  //example of select usage
  // const sessionToken = useAppSelector(selectSessionToken);
  //--------------------------------------------

  // Функция для мониторинга изменений аутентификации
  const monitorAuthState = () => {
    onAuthStateChanged(FIREBASE_AUTH, async (user: User | null) => {
      if (!user) {
        // Очистить данные пользователя и токен в случае выхода
        await AsyncStorage.removeItem("userSession");
        await AsyncStorage.removeItem("authToken");

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
