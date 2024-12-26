import { Colors, ThemeColors } from "@/src/constants/Colors";
import { StyleSheet, FlatList, View } from "react-native";
import RowItem from "@/src/components/RowItem";
import { useAppSelector } from "@/src/store/store";
import { selectCast, selectCrew } from "@/src/store/credits/creditsSlice";

export default function PersonsScreen() {
  const cast = useAppSelector(selectCast);
  const crew = useAppSelector(selectCrew);

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={cast}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RowItem data={item} />}
      /> */}
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
