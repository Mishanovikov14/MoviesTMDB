import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { ReactNode } from "react";
import { Colors, ThemeColors } from "@/src/constants/Colors";
import { MainStyles } from "@/src/constants/Style";

interface ButtonProps {
  onPress: () => void;
  children: ReactNode;
  style?: ViewStyle;
}

export default function Button({ onPress, children, style }: ButtonProps) {
  return (
    <View style={[styles.container, style]}>
      <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.text}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 200
  },

  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: Colors.PRIMARY,
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
