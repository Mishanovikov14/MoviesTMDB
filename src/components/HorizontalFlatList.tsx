import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { MainStyles } from "../constants/Style";
import ButtonWithArrow from "./ui/ButtonWithArrow";
import { MovieCard } from "../constants/Types";
import { ComponentType } from "react";

type cardData = {
  title: string;
  movies: MovieCard[];
  Item: ComponentType<{ data: MovieCard }>;
}

export default function HorizontalFlatList({ title, movies, Item }: cardData) {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>{title}</Text>
        <ButtonWithArrow
          onPress={() => {
            console.log("See all");
          }}
        >
          See all
        </ButtonWithArrow>
      </View>
      <FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <Item data={item}/>}
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
