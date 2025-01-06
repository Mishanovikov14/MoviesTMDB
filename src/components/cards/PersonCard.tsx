import { StyleSheet, Text, Image, Pressable } from "react-native";
import { MainStyles } from "../../constants/Style";
import { Colors } from "../../constants/Colors";
import { PersonListItem } from "@/src/constants/Types";
import { Href, Link } from "expo-router";

export default function PersonCard({ data, dynamicPath }: PersonListItem) {
  const link = dynamicPath + data.id as Href;

  return (
    <Link href={link} asChild>
    {/* <Link href={`/(tabs)/${tab}/(persons)/${data.id}`} asChild> */}
      <Pressable style={styles.itemContainer}>
        <Image
          source={
            data.profile_path
              ? { uri: `https://image.tmdb.org/t/p/w342${data.profile_path}` }
              : require("../../../assets/images/avatar.png")
          }
          style={[styles.image, !data.profile_path && {
            resizeMode: "center",
          }]}
        />
        <Text style={styles.name} numberOfLines={2}>
          {data.name}
        </Text>
        <Text style={styles.characterName} numberOfLines={2}>
          {data.character}
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
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 5,
  },

  name: {
    fontSize: MainStyles.SMALL_FONTSIZE,
    color: Colors.SECONDARY,
    textAlign: "center",
  },

  characterName: {
    fontSize: MainStyles.SMALL_FONTSIZE,
    color: Colors.LIGHT_GREY,
    textAlign: "center",
  },
});
