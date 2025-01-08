import { Colors } from "@/src/constants/Colors";
import { StyleSheet, FlatList, View } from "react-native";
import { useAppSelector } from "@/src/store/store";
import { selectCast } from "@/src/store/credits/creditsSlice";
import PersonRowItem from "@/src/components/PersonRowItem";

export default function PersonsScreen() {
  const cast = useAppSelector(selectCast) || [];

  return (
    <View style={styles.container}>
      <FlatList
        data={cast}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={({ item }) => <PersonRowItem data={item} dynamicPath="/(tabs)/(tv-shows)/(persons)/" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.DARK,
  },
});
