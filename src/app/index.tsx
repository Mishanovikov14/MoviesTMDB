import { StyleSheet, Text, View } from "react-native";
import Button from "../components/ui/Button";
import { ThemeColors } from "../constants/Colors";
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href={"/sign-in"} />;
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: ThemeColors.dark.background
//   },
// });
