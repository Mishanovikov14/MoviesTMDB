import { Colors } from "@/src/constants/Colors";
import { Stack } from "expo-router";
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
      <Stack.Screen name="(list)" options={{title: t("favorite")}}/>
      <Stack.Screen name="(movie)" options={{headerShown: false}}/>
      <Stack.Screen name="(tv-show)" options={{headerShown: false}}/>
    </Stack>
  );
}
