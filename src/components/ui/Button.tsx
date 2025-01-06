import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { MainStyles } from "@/src/constants/Style";
import { ButtonProps } from "@/src/constants/Types";

export default function Button({ onPress, children, style, disabled = false }: ButtonProps) {
  return (
    <View style={[styles.container, style]}>
      <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={onPress} disabled={disabled}>
        <View style={styles.button}>
          <Text style={styles.text}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 200,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 4,
  },

  button: {
    padding: 8,
  },

  text: {
    color: Colors.DARK,
    textAlign: "center",
    fontSize: MainStyles.FONTSIZE
  },

  pressed: {
    opacity: 0.75,
  },
});
