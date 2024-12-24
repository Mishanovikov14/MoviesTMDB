import { Colors } from "@/src/constants/Colors";
import { MainStyles } from "@/src/constants/Style";
import { StyleSheet, Text, View } from "react-native";

export default function TextWithTitle({ title, text }: { title: string; text: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },

  title: {
    color: Colors.SECONDARY,
    fontSize: MainStyles.FONTSIZE,
  },

  text: {
    color: Colors.LIGHT_GREY,
    fontSize: MainStyles.SMALL_FONTSIZE,
  },
});
