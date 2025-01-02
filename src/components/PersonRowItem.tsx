import { StyleSheet, Text, Image, Pressable, View } from "react-native";
import { Colors } from "../constants/Colors";
import { PersonListItem } from "@/src/constants/Types";
import { Href, Link } from "expo-router";
import { MainStyles } from "../constants/Style";

export default function PersonRowItem({ data, dynamicPath }: PersonListItem) {
  const link = dynamicPath + data.id as  Href;

  return (
    <Link href={link} asChild>
    {/* <Link href={`/(tabs)/${tab}/(persons)/${data.id}`} asChild> */}
      <Pressable style={styles.itemContainer}>
        <Image
          source={
            data.profile_path
              ? { uri: `https://image.tmdb.org/t/p/w342${data.profile_path}` }
              : require("../../assets/images/no-pictures.png")
          }
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.nameText} numberOfLines={2}>
            {data.name}
          </Text>
          <Text style={styles.characterText} numberOfLines={8}>
            {data.character || data.job}
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
    justifyContent: "center"
  },

  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 5,
  },

  nameText: {
    fontSize: MainStyles.FONTSIZE,
    color: Colors.SECONDARY,
    marginBottom: 10,
  },

  characterText: {
    fontSize: MainStyles.SMALL_FONTSIZE,
    color: Colors.LIGHT_GREY,
  },
});
