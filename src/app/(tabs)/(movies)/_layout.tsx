import HeaderWithSearch from "@/src/components/HeaderWithSearch";
import { Colors } from "@/src/constants/Colors";
import { router, Stack } from "expo-router";

export default function MovieLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.DARK },
        headerTintColor: Colors.PRIMARY,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="movies"
        options={{
          headerTitleAlign: "left",
          headerTitle: () => (
            <HeaderWithSearch title="Movies" onPress={() => router.push("/(tabs)/(movies)/search")} />
          ),
        }}
      />
      <Stack.Screen name="allMovies" options={{ title: "" }} />
      <Stack.Screen name="search" options={{ title: "" }} />
      <Stack.Screen name="(persons)" options={{ headerShown: false }} />
    </Stack>
  );
}
