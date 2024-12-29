import { ThemeColors } from "@/src/constants/Colors";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function ErrorBlock({text}: {text: string}) {
    return (
        <View style={styles.errorContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
      );
}

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: ThemeColors.dark.background,
        justifyContent: "center",
      },
    
      text: {
        color: Colors.PRIMARY,
      },
});