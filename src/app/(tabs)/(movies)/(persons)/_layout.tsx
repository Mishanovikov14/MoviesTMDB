import { Colors } from "@/src/constants/Colors";
import { Stack } from "expo-router";

export default function PersonLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.DARK },
        headerTintColor: Colors.PRIMARY,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="(credits)" options={{title: "Cust & Crew"}}/>
    </Stack>
  );
}
