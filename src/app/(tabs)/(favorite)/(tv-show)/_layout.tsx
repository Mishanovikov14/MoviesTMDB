import { Colors } from "@/src/constants/Colors";
import { Stack } from "expo-router";

export default function MovieLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.DARK },
        headerTintColor: Colors.PRIMARY,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="[tvShowId]" options={{ title: "" }} />
      <Stack.Screen name="similarTVShows" options={{ title: "" }} />
    </Stack>
  );
}
