import { StyleSheet, Text, Image, Pressable } from "react-native";
import { MainStyles } from "../../constants/Style";
import { Colors } from "../../constants/Colors";
import { ListItem } from "@/src/constants/Types";
import { Href, Link } from "expo-router";

export default function HorizontalCard({ data, dynamicPath, type }: ListItem) {
  const title = "title" in data ? data.title : data.name;
  const link = `${dynamicPath}${data.id}?type=${type}` as Href;

  return (
    <Link href={link} asChild>
      <Pressable style={styles.itemContainer}>
        <Image
          source={
            data.backdrop_path
              ? { uri: `https://image.tmdb.org/t/p/w342${data.backdrop_path}` }
              : require("../../../assets/images/no-pictures.png")
          }
          style={styles.image}
        />
        <Text style={styles.itemTitle} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.itemDescription} numberOfLines={2}>
          {data.overview}
        </Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: 258,
    alignItems: "center",
  },

  image: {
    width: 256,
    height: 144,
    borderRadius: 5,
    marginBottom: 5,
    borderColor: Colors.LIGHT_GREY,
    borderWidth: 1,
  },

  itemTitle: {
    fontSize: MainStyles.SMALL_FONTSIZE,
    color: Colors.SECONDARY,
    textAlign: "center",
  },

  itemDescription: {
    fontSize: MainStyles.SMALL_FONTSIZE,
    color: Colors.LIGHT_GREY,
  },
});
