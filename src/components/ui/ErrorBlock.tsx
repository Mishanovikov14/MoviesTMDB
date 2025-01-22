import { Colors } from "@/src/constants/Colors";
import { View, Text, StyleSheet } from "react-native";

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
        backgroundColor: Colors.DARK,
        justifyContent: "center",
      },
    
      text: {
        color: Colors.PRIMARY,
        textAlign: "center",
      },
});