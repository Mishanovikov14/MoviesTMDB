import { Alert, Keyboard, StyleSheet, Text, View } from "react-native";
import { Colors, ThemeColors } from "@/src/constants/Colors";
import Button from "@/src/components/ui/Button";
import { Link, Stack } from "expo-router";
import { MainStyles } from "@/src/constants/Style";
import { useForm } from "react-hook-form";
import { useState } from "react";
import FormInputController from "@/src/components/controllers/FormInputController";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/src/constants/schemas/AuthSchemas";
import { FIREBASE_AUTH } from "@/src/lib/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

type FormData = {
  email: string;
  password: string;
};

export default function signInPage() {
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(loginSchema) });

  async function signInWithEmail({ email, password }: FormData) {
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      console.log("Login response: ", userCredential);

      console.log("User credential: ", userCredential.user);

      Alert.alert("Login");

      reset();
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

  const handleNavigation = () => {
    reset(); // Reset the form
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign in" }} />

      <Text style={styles.label}>Email</Text>
      <FormInputController name={"email"} control={control} placeholder={"Email"} errors={errors} />

      <Text style={styles.label}>Password</Text>
      <FormInputController
        name={"password"}
        control={control}
        placeholder={"Password"}
        errors={errors}
        props={{ secureTextEntry: true }}
      />

      <Button onPress={handleSubmit(signInWithEmail)} disabled={loading} style={styles.button}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>
      <Link href={"/sign-up"} style={styles.link} onPress={handleNavigation}>
        Create an account
      </Link>
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
