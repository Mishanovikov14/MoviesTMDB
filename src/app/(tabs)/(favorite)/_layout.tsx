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
      <Stack.Screen name="(list)" options={{title: "Favorite"}}/>
      <Stack.Screen name="(movie)" options={{headerShown: false}}/>
      <Stack.Screen name="(tv-show)" options={{headerShown: false}}/>
      <Stack.Screen name="(persons)" options={{headerShown: false}}/>
    </Stack>
  );
}
