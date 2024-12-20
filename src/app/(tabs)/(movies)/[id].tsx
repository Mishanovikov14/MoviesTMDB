import { ScrollView, StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Colors, ThemeColors } from "@/src/constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import { useMovieDetails } from "@/src/api/movies";
import Loader from "@/src/components/ui/Loader";
import { MainStyles } from "@/src/constants/Style";
import LinearGradient from "react-native-linear-gradient";
import GenreList from "@/src/components/GenreList";
import HorizontalFlatList from "@/src/components/HorizontalFlatList";
import PersonCard from "@/src/components/cards/PersonCard";
import { Ionicons } from "@expo/vector-icons";
import VideoList from "@/src/components/VideoList";
import { Video } from "@/src/constants/Types";
import VerticalCard from "@/src/components/cards/VerticalCard";
import { formatDate } from "@/src/utils/dateFormating";

export default function MovieDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = typeof idString === "string" ? idString : idString[0];

  const { data: details, error, isLoading } = useMovieDetails(id);

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ title: "" }} />
        <Loader />
      </>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Stack.Screen options={{ title: "" }} />
        <Text style={styles.text}>Failed to fetch Movie Details. Please try again!</Text>
      </View>
    );
  }

  //cast and crew
  const credits = details.credits;
  const videos = details.videos.results.filter(
    (video: Video) => video.type === "Trailer" && video.official === true
  );
  const castData = credits.cast.slice(0, 12);
  const genres = details.genres;
  const similar = details.similar.results;

  console.log(JSON.stringify(castData[0], null, 3));

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: details.title }} />
      <LinearGradient
        style={styles.backdropContainer}
        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 0.7)"]}
      />

      <Image
        source={
          details.backdrop_path
            ? { uri: `https://image.tmdb.org/t/p/w342${details.backdrop_path}` }
            : require("../../../../assets/images/no-pictures.png")
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
                : require("../../../../assets/images/no-pictures.png")
            }
            style={styles.poster}
            resizeMode="contain"
          />
          <View style={styles.defaultContainer}>
            <Text style={styles.title}>{details.title}</Text>

            <View style={styles.rate}>
              <Ionicons name="star" size={16} color={Colors.SECONDARY} />
              <Text style={styles.rateText}>{details.vote_average.toFixed(1)}</Text>
              <Text style={styles.smallText}>{`(${details.vote_count})`}</Text>
            </View>

            <GenreList genres={genres} />

            <Text
              style={styles.releaseText}
            >{`Released: ${formatDate(details.release_date)}`}</Text>

            <Text style={styles.overview}>{details.overview}</Text>
          </View>
        </View>

        {castData.length > 0 && (
          <HorizontalFlatList
            title={"Cast & Crew"}
            data={castData}
            Item={PersonCard}
            path="/(persons)/persons"
          />
        )}

        {videos.length > 0 && <VideoList title="Trailers" videos={videos} />}

        {similar.length > 0 && (
          <HorizontalFlatList
            title={"Similar"}
            data={similar}
            Item={VerticalCard}
            path="/(tabs)/(movies)/allMovies"
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: ThemeColors.dark.background,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: ThemeColors.dark.background,
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

  movieDetailsContainer: {
    width: "100%",
    marginTop: -60,
    padding: 20,
    zIndex: 2,
  },

  movieDetails: {
    flexDirection: "row",
    marginBottom: 24,
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
    color: Colors.PRIMARY,
    fontSize: MainStyles.FONTSIZE,
    fontWeight: "bold",
  },

  overview: {
    color: Colors.LIGHT_GREY,
    fontSize: MainStyles.SMALL_FONTSIZE,
  },

  text: {
    color: Colors.PRIMARY,
    alignSelf: "center",
  },
});
