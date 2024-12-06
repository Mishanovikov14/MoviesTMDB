import { Colors } from "@/src/constants/Colors";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.DARK },
        headerTintColor: Colors.PRIMARY,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="login" options={{title: "Login"}}/>
      <Stack.Screen name="sign-up" options={{title: "Sign-Up"}}/>
    </Stack>
  );
}
