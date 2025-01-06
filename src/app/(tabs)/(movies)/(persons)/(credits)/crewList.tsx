import { ThemeColors } from "@/src/constants/Colors";
import { StyleSheet, FlatList, View } from "react-native";
import { useAppSelector } from "@/src/store/store";
import { selectCrew } from "@/src/store/credits/creditsSlice";
import PersonRowItem from "@/src/components/PersonRowItem";

export default function PersonsScreen() {
  const crew = useAppSelector(selectCrew) || [];

  return (
    <View style={styles.container}>
      <FlatList
        data={crew}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={({ item }) => <PersonRowItem data={item} dynamicPath="/(tabs)/(movies)/(persons)/" />}
      />
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
});
