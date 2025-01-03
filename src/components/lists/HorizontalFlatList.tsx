import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { MainStyles } from "../../constants/Style";
import ButtonWithArrow from "../ui/ButtonWithArrow";
import { ComponentType } from "react";
import { RelativePathString, router } from "expo-router";

type WithId = { id: number };

type cardData<T extends WithId> = {
  title: string;
  data: T[];
  Item: ComponentType<{ data: T, dynamicPath: string}>;
  path: string;
  dynamicPath: string;
}

export default function HorizontalFlatList<T extends WithId>({ title, data, Item, path, dynamicPath }: cardData<T>) {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>{title}</Text>
        {path.length > 0 && <ButtonWithArrow
          onPress={() => {
            router.push(path as RelativePathString);
          }}
        >
          See all
        </ButtonWithArrow>}
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.id.toString() + index}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <Item data={item} dynamicPath={dynamicPath}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 24,
  },

  sectionTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },

  sectionTitleText: {
    color: Colors.PRIMARY,
    fontSize: MainStyles.FONTSIZE,
  },

  separator: {
    width: 10
  }
});
