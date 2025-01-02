import Button from "@/src/components/ui/Button";
import { Colors, ThemeColors } from "@/src/constants/Colors";
import { FIREBASE_AUTH } from "@/src/lib/FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <Button
        onPress={async () => {
          FIREBASE_AUTH.signOut();
          await AsyncStorage.setItem("isSignedIn", "false");
          router.replace("/");
        }}
      >
        Sign Out
      </Button>
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
