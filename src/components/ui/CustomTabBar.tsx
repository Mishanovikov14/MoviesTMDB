import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { Colors } from "@/src/constants/Colors";
import { MainStyles } from "@/src/constants/Style";
import {
  MaterialTopTabDescriptorMap,
  MaterialTopTabNavigationHelpers,
} from "@react-navigation/material-top-tabs/lib/typescript/commonjs/src/types";

type CustomTabBarProps = {
  state: TabNavigationState<ParamListBase>;
  descriptors: MaterialTopTabDescriptorMap;
  navigation: MaterialTopTabNavigationHelpers;
};

export default function CustomTabBar({ state, descriptors, navigation }: CustomTabBarProps) {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;

        const isFocused = state.index === index;

        const handlePress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={handlePress}
            style={styles.tabItem}
          >
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}>
              {label.toString()}
            </Text>
            <View style={[styles.tabIndicator, isFocused && styles.tabIndicatorFocused]} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: Colors.DARK,
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },

  tabLabel: {
    color: Colors.SECONDARY,
    fontSize: MainStyles.FONTSIZE,
  },

  tabLabelFocused: {
    color: Colors.PRIMARY,
  },

  tabIndicator: {
    height: 2,
    backgroundColor: "transparent",
    marginTop: 4,
    width: "100%",
  },

  tabIndicatorFocused: {
    backgroundColor: Colors.PRIMARY,
  },
});
