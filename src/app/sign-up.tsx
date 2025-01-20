import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput } from "react-native";
import { Colors } from "@/src/constants/Colors";
import Button from "@/src/components/ui/Button";
import { Stack, router } from "expo-router";
import { MainStyles } from "@/src/constants/Style";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import FormInputController from "@/src/components/controllers/FormInputController";
import { signUpSchema } from "@/src/constants/schemas/AuthSchemas";
import { FIREBASE_AUTH } from "@/src/lib/FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../store/store";
import { showModal } from "../store/modal/modalSlice";
import { useAddToFavorite } from "../api/favourite";
import { setFavorites } from "../store/favorites/favoriteSlice";

type FormData = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function signUpPage() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const auth = FIREBASE_AUTH;
  const dispatch = useAppDispatch();
  const { mutateAsync } = useAddToFavorite();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(signUpSchema) });

  async function signUp({ userName, email, password }: FormData) {
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: userName,
      });

      await AsyncStorage.setItem("isSignedIn", "true");
      await AsyncStorage.setItem("userId", user.uid);

      const favorites = {"movieIds": [], "tvShowIds": []}

      await mutateAsync(favorites);

      dispatch(setFavorites(favorites));

      router.replace("/(tabs)/(movies)/movies");
    } catch (error) {
      dispatch(
        showModal({
          title: "Something went wrong",
          message: JSON.stringify(error),
          borderColor: Colors.ERROR,
        })
      );
    } finally {
      setLoading(false);
      
      Keyboard.dismiss();
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
      <Stack.Screen options={{ title: "Sign Up" }} />

      <Text style={styles.label}>User Name</Text>
      <FormInputController
        name={"userName"}
        // @ts-ignore
        control={control}
        placeholder={"User Name"}
        errors={errors}
        props={{
          blurOnSubmit: false,
          returnKeyType: "next",
          onSubmitEditing: () => emailRef.current?.focus(),
        }}
      />

      <Text style={styles.label}>Email</Text>
      <FormInputController
        ref={emailRef}
        name={"email"}
        // @ts-ignore
        control={control}
        placeholder={"Email"}
        errors={errors}
        props={{
          keyboardType: "email-address",
          autoCapitalize: "none",
          blurOnSubmit: false,
          returnKeyType: "next",
          onSubmitEditing: () => passwordRef.current?.focus(),
        }}
      />

      <Text style={styles.label}>Password</Text>
      <FormInputController
        ref={passwordRef}
        name={"password"}
        // @ts-ignore
        control={control}
        placeholder={"Password"}
        errors={errors}
        props={{
          secureTextEntry: true,
          autoCapitalize: "none",
          blurOnSubmit: false,
          returnKeyType: "next",
          onSubmitEditing: () => confirmPasswordRef.current?.focus(),
        }}
      />

      <Text style={styles.label}>Confirm Password</Text>
      <FormInputController
        ref={confirmPasswordRef}
        name={"confirmPassword"}
        // @ts-ignore
        control={control}
        placeholder={"Confirm Password"}
        errors={errors}
        props={{
          secureTextEntry: true,
          autoCapitalize: "none",
          onSubmitEditing: handleSubmit(signUp),
        }}
      />

      <Button onPress={handleSubmit(signUp)} disabled={loading} style={styles.button}>
        {loading ? "Signing up..." : "Sign Up"}
      </Button>
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
});
