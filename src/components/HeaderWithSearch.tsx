import { StyleSheet, Text, View } from "react-native";
import { MainStyles } from "../constants/Style";
import { Colors } from "../constants/Colors";
import ButtonWithIcon from "./ui/ButtonWithIcon";

export default function HeaderWithSearch({title, onPress}: {title: string, onPress: () => void}) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
      <ButtonWithIcon
        onPress={onPress}
        style={{ backgroundColor: Colors.DARK }}
        iconName="search"
        iconColor={Colors.PRIMARY}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: MainStyles.FONTSIZE,
    color: Colors.PRIMARY,
    fontWeight: "bold",
  },
});
