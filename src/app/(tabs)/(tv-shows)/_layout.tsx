import HeaderWithSearch from "@/src/components/HeaderWithSearch";
import { Colors } from "@/src/constants/Colors";
import { router, Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function MovieLayout() {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.DARK },
        headerTintColor: Colors.PRIMARY,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="tv-shows"
        options={{
          headerTitleAlign: "left",
          headerTitle: () => (
            <HeaderWithSearch
              title={t("tvShows")}
              onPress={() => router.push("/(tabs)/(tv-shows)/search")}
            />
          ),
        }}
      />
      <Stack.Screen name="allShows" options={{ title: "" }} />
      <Stack.Screen name="search" options={{ title: "" }} />
      <Stack.Screen name="(persons)" options={{ headerShown: false }} />
    </Stack>
  );
}
