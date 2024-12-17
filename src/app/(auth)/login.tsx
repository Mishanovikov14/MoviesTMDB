import { Alert, Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors, ThemeColors } from "@/src/constants/Colors";
import Button from "@/src/components/ui/Button";
import { Link, Stack } from "expo-router";
import { MainStyles } from "@/src/constants/Style";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
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
  const passwordRef = useRef<TextInput>(null);
  const auth = FIREBASE_AUTH;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) });

  async function signInWithEmail({ email, password }: FormData) {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

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
      <FormInputController
        name={"email"}
        control={control}
        placeholder={"Email"}
        errors={errors}
        props={{
          blurOnSubmit: false,
          returnKeyType: "next",
          onSubmitEditing: () => passwordRef.current?.focus(),
        }}
      />

      <Text style={styles.label}>Password</Text>
      <FormInputController
        ref={passwordRef}
        name={"password"}
        control={control}
        placeholder={"Password"}
        errors={errors}
        props={{ secureTextEntry: true, onSubmitEditing: handleSubmit(signInWithEmail) }}
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
