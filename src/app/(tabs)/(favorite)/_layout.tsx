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
      <Stack.Screen name="favorite" options={{title: "Favorite"}}/>
      <Stack.Screen name="[movieId]" options={{title: ""}}/>
      <Stack.Screen name="[showId]" options={{title: ""}}/>
      <Stack.Screen name="(persons)" options={{headerShown: false}}/>
    </Stack>
  );
}
