import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CustomTabBar from "@/src/components/ui/CustomTabBar";
import { useTranslation } from "react-i18next";

const TopTabNavigator = createMaterialTopTabNavigator();
const TopTab = withLayoutContext(TopTabNavigator.Navigator);

export default function TopBarLayout() {
  const { t } = useTranslation();

  return (
    // @ts-ignore
    <TopTab tabBar={(props) => <CustomTabBar {...props} />}>
      <TopTab.Screen name="moviesList" options={{ title: t("movies") }} />
      <TopTab.Screen name="tvShowsList" options={{ title: t("tvShows") }} />
    </TopTab>
  );
}
