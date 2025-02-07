import { Colors } from "@/src/constants/Colors";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function PersonLayout() {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.DARK },
        headerTintColor: Colors.PRIMARY,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="(credits)" options={{ title: t("castAndCrew") }} />
      <Stack.Screen name="[id]" options={{ title: "" }} />
    </Stack>
  );
}
