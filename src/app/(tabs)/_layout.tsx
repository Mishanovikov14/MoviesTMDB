import { Colors } from "@/src/constants/Colors";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AuthLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: Colors.DARK, height: 110 },
        tabBarStyle: { backgroundColor: Colors.DARK, borderTopWidth: 0 },
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.LIGHT_GREY,
      }}
    >
      <Tabs.Screen
        name="(movies)"
        options={{
          title: "Movies",
          tabBarIcon: ({ color }) => <Ionicons name="film" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(tv-shows)"
        options={{
          title: "TV Shows",
          tabBarIcon: ({ color }) => <Ionicons name="tv" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(favorite)"
        options={{
          title: "Favorite",
          tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
          headerTintColor: Colors.PRIMARY,
          headerTitleAlign: "center",
        }}
      />
    </Tabs>
  );
}
