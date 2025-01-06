
import { Colors, ThemeColors } from "@/src/constants/Colors";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ThemeColors.dark.background,
  },
});
