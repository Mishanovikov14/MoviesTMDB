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
      <Stack.Screen name="tv-shows" options={{title: "TV Shows"}}/>
      <Stack.Screen name="allShows" options={{title: ""}}/>
      <Stack.Screen name="(persons)" options={{headerShown: false}}/>
    </Stack>
  );
}
