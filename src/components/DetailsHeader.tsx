import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import GenreList from "./lists/GenreList";
import { Colors } from "../constants/Colors";
import { MainStyles } from "../constants/Style";
import { Genre, MovieCard, TVShowCard } from "../constants/Types";
import { formatDate } from "../utils/dateFormating";

export default function DetailsHeader({
  details,
  genres,
}: {
  details: MovieCard | TVShowCard;
  genres: Genre[];
}) {
  const title = "title" in details ? details.title : details.name;
  const releaseDate = "release_date" in details ? details.release_date : details.first_air_date;

  return (
    <>
      <LinearGradient
        style={styles.backdropContainer}
        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 0.7)"]}
      />

      <Image
        source={
          details.backdrop_path
            ? { uri: `https://image.tmdb.org/t/p/w342${details.backdrop_path}` }
            : require("../../assets/images/no-pictures.png")
        }
        style={styles.backdrop}
        resizeMode="contain"
      />

      <View style={styles.movieDetailsContainer}>
        <View style={styles.movieDetails}>
          <Image
            source={
              details.poster_path
                ? { uri: `https://image.tmdb.org/t/p/w342${details.poster_path}` }
                : require("../../assets/images/no-pictures.png")
            }
            style={styles.poster}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.rate}>
              <Ionicons name="star" size={16} color={Colors.SECONDARY} />
              <Text style={styles.rateText}>{details.vote_average.toFixed(1)}</Text>
              <Text style={styles.smallText}>{`(${details.vote_count})`}</Text>
            </View>

            <GenreList genres={genres} />

            {releaseDate.length > 0 && (
              <Text style={styles.releaseText}>{`Released: ${formatDate(releaseDate)}`}</Text>
            )}
          </View>
        </View>

        <Text style={styles.overview}>{details.overview}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },

  movieDetailsContainer: {
    flex: 1,
    width: "100%",
    marginTop: -60,
    padding: 20,
    zIndex: 2,
  },

  movieDetails: {
    flexDirection: "row",
    marginBottom: 10,
  },

  backdrop: {
    width: Dimensions.get("window").width,
    height: undefined,
    aspectRatio: 16 / 9,
  },

  poster: {
    width: 140,
    height: 210,
    borderRadius: 5,
    borderColor: Colors.LIGHT_GREY,
    borderWidth: 2,
    marginRight: 10,
  },

  title: {
    color: Colors.SECONDARY,
    fontSize: MainStyles.FONTSIZE,
    fontWeight: "bold",
  },

  overview: {
    color: Colors.LIGHT_GREY,
    fontSize: MainStyles.SMALL_FONTSIZE,
  },

  rate: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  rateText: {
    marginLeft: 5,
    color: Colors.SECONDARY,
    fontSize: MainStyles.FONTSIZE,
  },

  smallText: {
    marginLeft: 5,
    color: Colors.SECONDARY,
    fontSize: MainStyles.SMALL_FONTSIZE,
  },

  releaseText: {
    color: Colors.SECONDARY,
    fontSize: MainStyles.SMALL_FONTSIZE,
    marginBottom: 10,
  },

  backdropContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
    zIndex: 1,
  },
});
