import { StyleSheet, Text, Image, Pressable, View } from "react-native";
import { Colors } from "../constants/Colors";
import { ListItem } from "@/src/constants/Types";
import { Href, Link } from "expo-router";
import { MainStyles } from "../constants/Style";

export default function RowItem({ data, dynamicPath }: ListItem) {
  const title = "title" in data ? data.title : data.name;
  const link = dynamicPath + data.id as Href;

  return (
    <Link href={link} asChild>

    {/* // <Link href={`/(tabs)/${tab}/${data.id}`} asChild> */}
      <Pressable style={styles.itemContainer}>
        <Image
          source={
            data.poster_path
              ? { uri: `https://image.tmdb.org/t/p/w342${data.poster_path}` }
              : require("../../assets/images/no-pictures.png")
          }
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.itemDescription} numberOfLines={8}>
            {data.overview}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  textContainer: {
    flex: 1,
    marginLeft: 20,
  },

  image: {
    width: 120,
    height: 180,
    borderRadius: 5,
    marginBottom: 5,
    borderColor: Colors.LIGHT_GREY,
    borderWidth: 2,
  },

  itemTitle: {
    fontSize: MainStyles.FONTSIZE,
    color: Colors.SECONDARY,
    marginBottom: 10,
  },

  itemDescription: {
    fontSize: MainStyles.SMALL_FONTSIZE,
    color: Colors.LIGHT_GREY,
  },
});
