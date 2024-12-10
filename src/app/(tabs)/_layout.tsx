import { Colors } from "@/src/constants/Colors";
import { Tabs } from "expo-router";

export default function AuthLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: Colors.DARK },
        headerTintColor: Colors.PRIMARY,
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen name="home" options={{title: "Home"}}/>
    </Tabs>
  );
}
