import { Alert, Keyboard, StyleSheet, Text, View } from "react-native";
import { Colors, ThemeColors } from "@/src/constants/Colors";
import Button from "@/src/components/ui/Button";
import { Stack, router } from "expo-router";
import { MainStyles } from "@/src/constants/Style";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormInputController from "@/src/components/controllers/FormInputController";
import { signUpSchema } from "@/src/constants/schemas/AuthSchemas";
import { FIREBASE_AUTH } from "@/src/lib/FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

type FormData = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function signUpPage() {
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });

  async function signUp({ userName, email, password }: FormData) {
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: userName,
      });

      router.back();
    } catch (error) {
      //TODO: Normal error handling
      Alert.alert(JSON.stringify(error));
      console.log("Error: ", error);
    } finally {
      setLoading(false);

      //Remove keyboard from a screen
      Keyboard.dismiss();
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign Up" }} />

      <Text style={styles.label}>User Name</Text>
      <FormInputController
        name={"userName"}
        control={control}
        placeholder={"User Name"}
        errors={errors}
      />

      <Text style={styles.label}>Email</Text>
      <FormInputController
        name={"email"}
        control={control}
        placeholder={"Email"}
        errors={errors}
        props={{ keyboardType: "email-address", autoCapitalize: "none" }}
      />

      <Text style={styles.label}>Password</Text>
      <FormInputController
        name={"password"}
        control={control}
        placeholder={"Password"}
        errors={errors}
        props={{ secureTextEntry: true, autoCapitalize: "none" }}
      />

      <Text style={styles.label}>Confirm Password</Text>
      <FormInputController
        name={"confirmPassword"}
        control={control}
        placeholder={"Confirm Password"}
        errors={errors}
        props={{ secureTextEntry: true, autoCapitalize: "none" }}
      />

      <Button onPress={handleSubmit(signUp)} disabled={loading} style={styles.button}>
        {loading ? "Signing up..." : "Sign Up"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: ThemeColors.dark.background,
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
