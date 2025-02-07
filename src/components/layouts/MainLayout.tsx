import { Colors } from "@/src/constants/Colors";
import { FIREBASE_AUTH } from "@/src/lib/FirebaseConfig";
import { clearUser, setUser } from "@/src/store/auth/authSlice";
import { showModal } from "@/src/store/modal/modalSlice";
import { useAppDispatch } from "@/src/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { setProfileLanguage } from "@/src/store/profile/profileSlice";
import Loader from "../ui/Loader";
import { useTranslation } from "react-i18next";

export function MainLayout() {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation();

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

  let appLanguage = "";

  useEffect(() => {
    async function loadLanguage() {
      try {
        const savedLanguage = await AsyncStorage.getItem("appLanguage");
        if (savedLanguage) {
          appLanguage = savedLanguage;
          i18n.changeLanguage(savedLanguage);
        } else {
          appLanguage = "en-US";

          await AsyncStorage.setItem("appLanguage", "en-US");
          i18n.changeLanguage(appLanguage);
        }
      } catch (error) {
        dispatch(
          showModal({
            title: t("defaultErrorTitle"),
            message: "Error while loading language",
            borderColor: Colors.ERROR,
          })
        );
      } finally {
        dispatch(setProfileLanguage({ language: appLanguage }));
        await SplashScreen.hideAsync();
        setIsReady(true);
      }
    }

    loadLanguage();
  }, [i18n, dispatch]);

  if (!isReady) {
    return <Loader />;
  }

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
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ title: "" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
