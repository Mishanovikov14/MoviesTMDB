import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput } from "react-native";
import { Colors } from "@/src/constants/Colors";
import Button from "@/src/components/ui/Button";
import { Link, Redirect, Stack, router } from "expo-router";
import { MainStyles } from "@/src/constants/Style";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import FormInputController from "@/src/components/controllers/FormInputController";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/src/constants/schemas/AuthSchemas";
import { FIREBASE_AUTH } from "@/src/lib/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/ui/Loader";
import { useAppDispatch } from "../store/store";
import { showModal } from "../store/modal/modalSlice";
import { setFavorites } from "../store/favorites/favoriteSlice";
import { fetchFavorites } from "../api/favourite";
import { useTranslation } from "react-i18next";

type FormData = {
  email: string;
  password: string;
};

export default function signInPage() {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { t } = useTranslation();
  const passwordRef = useRef<TextInput>(null);
  const auth = FIREBASE_AUTH;
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) });

  async function signInWithEmail({ email, password }: FormData) {
    setLoading(true);

    try {
      const data = await signInWithEmailAndPassword(auth, email, password);

      await AsyncStorage.setItem("isSignedIn", "true");
      await AsyncStorage.setItem("userId", data.user.uid);

      const favorites = await fetchFavorites(data.user.uid);

      dispatch(setFavorites(favorites));

      reset();

      router.replace("/(tabs)/(movies)/movies");
    } catch (error: any) {
      let errorMessage = JSON.stringify(error);
      let title = t("defaultErrorTitle");

      if (error.code === "auth/invalid-credential") {
        title = t("invalidCredentials");
        errorMessage = t("credentialsError");
      }

      dispatch(
        showModal({
          title: title,
          message: errorMessage,
          borderColor: Colors.ERROR,
        })
      );
    } finally {
      setLoading(false);

      Keyboard.dismiss();
    }
  }

  const handleNavigation = () => {
    reset(); // Reset the form
  };

  const checkLoginStatus = async () => {
    try {
      const isSignedIn = await AsyncStorage.getItem("isSignedIn");
      const userId = await AsyncStorage.getItem("userId");

      if (isSignedIn === "true") {
        const favorites = await fetchFavorites(userId!);

        dispatch(setFavorites(favorites));

        setIsLoggedIn(isSignedIn === "true");
      }
    } catch (error) {
      dispatch(
        showModal({
          title: t("defaultErrorTitle"),
          message: JSON.stringify(error),
          borderColor: Colors.ERROR,
        })
      );
      setIsLoggedIn(false);
    } finally {
      setInitLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (initLoading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <Loader />
      </>
    );
  }

  if (isLoggedIn) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <Loader />
        <Redirect href={"/(tabs)/(movies)/movies"} />
      </>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
      <Image source={require("../../assets/images/logo.png")} style={styles.logo} />

      <Text style={styles.label}>{t("email")}</Text>
      <FormInputController
        name={"email"}
        // @ts-ignore
        control={control}
        placeholder={t("email")}
        errors={errors}
        props={{
          blurOnSubmit: false,
          returnKeyType: "next",
          autoCapitalize: "none",
          keyboardType: "email-address",
          onSubmitEditing: () => passwordRef.current?.focus(),
        }}
      />

      <Text style={styles.label}>{t("password")}</Text>
      <FormInputController
        ref={passwordRef}
        name={"password"}
        // @ts-ignore
        control={control}
        placeholder={t("password")}
        errors={errors}
        props={{ secureTextEntry: true, onSubmitEditing: handleSubmit(signInWithEmail) }}
      />

      <Button onPress={handleSubmit(signInWithEmail)} disabled={loading} style={styles.button}>
        {loading ? t("signingIn") : t("signIn")}
      </Button>
      <Link href={"/sign-up"} style={styles.link} onPress={handleNavigation}>
        {t("createAccount")}
      </Link>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.DARK,
  },

  button: {
    marginTop: 30,
  },

  link: {
    color: Colors.PRIMARY,
    fontSize: MainStyles.FONTSIZE,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginTop: 10,
  },

  label: {
    color: Colors.PRIMARY,
    fontSize: MainStyles.FONTSIZE,
    marginTop: 10,
  },

  logo: {
    width: 250,
    height: 250,
    alignSelf: "center",
    marginTop: 30,
  },
});
