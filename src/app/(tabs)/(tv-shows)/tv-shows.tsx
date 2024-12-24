import { Colors, ThemeColors } from "@/src/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

export default function TVShows() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TV Shows</Text>
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
