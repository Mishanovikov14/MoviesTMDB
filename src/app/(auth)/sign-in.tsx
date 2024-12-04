import { StyleSheet, Text, View } from "react-native";
import { Colors, ThemeColors } from "@/src/constants/Colors";
import Button from "@/src/components/ui/Button";
import { Link } from "expo-router";
import { MainStyles } from "@/src/constants/Style";

export default function signInPage() {
  return (
    <View style={styles.container}>
      <Button onPress={() => console.log("Sign in!")} style={styles.button}>Sign In</Button>
      <Link href="/sign-up" style={styles.link}>Sign Up</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ThemeColors.dark.background,
  },

  button: {
    marginVertical: 12
  },

  link: {
    color: Colors.YELLOW,
    fontSize: MainStyles.FONTSIZE,
    fontWeight: "bold"
  }
});
