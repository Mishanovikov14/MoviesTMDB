import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { MainStyles } from "../../constants/Style";
import { Colors } from "../../constants/Colors";
import { ListItem } from "@/src/constants/Types";
import { Link } from "expo-router";

export default function HorizontalCard({ data }: ListItem) {
  return (
    <Link href={`/(tabs)/(movies)/${data.id}`} asChild>
      <Pressable style={styles.itemContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w342${data.backdrop_path}` }}
          style={styles.image}
        />
        <Text style={styles.itemTitle} numberOfLines={2}>
          {data.original_title}
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
    color: Colors.PRIMARY,
    textAlign: "center",
  },

  itemDescription: {
    fontSize: MainStyles.SMALL_FONTSIZE,
    color: Colors.LIGHT_GREY,
  },
});
