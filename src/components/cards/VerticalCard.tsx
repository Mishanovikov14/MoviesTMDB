import { StyleSheet, Text, Image, Pressable } from "react-native";
import { MainStyles } from "../../constants/Style";
import { Colors } from "../../constants/Colors";
import { ListItem } from "@/src/constants/Types";
import { Href, Link } from "expo-router";

export default function VerticalCard({ data, dynamicPath }: ListItem) {
  const title = "title" in data ? data.title : data.name;
  const link = dynamicPath + data.id as Href;

  return (
    <Link href={link} asChild>
    {/* <Link href={`/(tabs)/${tab}/${data.id}`} asChild> */}
      <Pressable style={styles.itemContainer} >
        <Image
          source={
            data.poster_path
              ? { uri: `https://image.tmdb.org/t/p/w342${data.poster_path}` }
              : require("../../../assets/images/no-pictures.png")
          }
          style={styles.image}
        />
        <Text style={styles.itemTitle} numberOfLines={2}>
          {title}
        </Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: 122,
    alignItems: "center",
  },

  image: {
    width: 120,
    height: 180,
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
});
