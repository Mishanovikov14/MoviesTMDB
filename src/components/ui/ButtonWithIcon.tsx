import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { ButtonProps } from "@/src/constants/Types";
import { Ionicons } from "@expo/vector-icons";

export default function ButtonWithIcon({
  onPress,
  iconName = "add",
  iconColor = Colors.DARK,
  style,
  disabled = false,
}: ButtonProps) {
  return (
    <View style={[styles.container, style]}>
      <Pressable
        style={({ pressed }) => [
            styles.pressable,
            pressed && styles.pressed
          ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Ionicons name={iconName} color={iconColor} size={24} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    minWidth: 30,
    minHeight: 30,
    alignItems: "center",
    justifyContent:"center"
  },

  pressable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  pressed: {
    opacity: 0.75,
  },
});
