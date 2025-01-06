import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CustomTabBar from "@/src/components/ui/CustomTabBar";

const TopTabNavigator = createMaterialTopTabNavigator();
const TopTab = withLayoutContext(TopTabNavigator.Navigator);

export default function TopBarLayout() {
  return (
    // @ts-ignore
    <TopTab tabBar={(props) => <CustomTabBar {...props} />}>
      <TopTab.Screen name="moviesList" options={{ title: "Movies" }} />
      <TopTab.Screen name="tvShowsList" options={{ title: "TV Shows" }} />
    </TopTab>
  );
}
