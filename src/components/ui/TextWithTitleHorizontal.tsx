import { Colors } from "@/src/constants/Colors";
import { MainStyles } from "@/src/constants/Style";
import { StyleSheet, Text, View } from "react-native";

export default function TextWithTitleHorizontal({ title, text }: { title: string; text: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    color: Colors.SECONDARY,
    fontSize: MainStyles.FONTSIZE,
    marginRight: 10,
  },

  text: {
    color: Colors.LIGHT_GREY,
    fontSize: MainStyles.FONTSIZE,
  },
});
