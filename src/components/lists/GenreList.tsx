import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { MainStyles } from "../../constants/Style";
import { Genre, Genres } from "@/src/constants/Types";

export default function GenreList({ genres }: Genres) {
  return (
    <View style={styles.genre}>
      {genres.map((genre: Genre) => (
        <View key={genre.id} style={styles.container}>
          <Text style={styles.text}>{genre.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.LIGHT_GREY,
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    maxHeight: 35,
    minWidth: "30%",
    marginBottom: 10,
    marginRight: 5,
  },

  text: {
    color: Colors.SECONDARY,
    fontSize: MainStyles.SMALL_FONTSIZE,
  },

  genre: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginTop: 10,
  },
});
