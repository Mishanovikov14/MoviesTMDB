import { StyleSheet, Text, View } from "react-native";
import { Colors, ThemeColors } from "@/src/constants/Colors";

export default function MovieDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Movie Details Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: ThemeColors.dark.background,
  },

  text: {
    color: Colors.PRIMARY,
  },
});
