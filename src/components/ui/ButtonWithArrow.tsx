import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { MainStyles } from "@/src/constants/Style";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { ButtonProps } from "@/src/constants/Types";

export default function ButtonWithArrow({ onPress, children }: ButtonProps) {
  return (
    <View style={styles.container}>
      <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.text}>{children}</Text>
          <Ionicons name="chevron-forward-outline" size={16} color={Colors.PRIMARY} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center"
  },

  button: {
    flexDirection:"row",
    alignItems: "center"
  },

  text: {
    color: Colors.PRIMARY,
    fontSize: MainStyles.SMALL_FONTSIZE,
  },

  pressed: {
    opacity: 0.75,
  },
});
