import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemeColors } from "../../../constants/Colors";
import { useAppSelector } from "@/src/store/store";
import Loader from "@/src/components/ui/Loader";
import { usePopularMovies } from "@/src/api/movies";
import HorizontalFlatList from "@/src/components/HorizontalFlatList";
import VerticalCard from "@/src/components/cards/VerticalCard";
import HorizontalCard from "@/src/components/cards/HorizontalCard";

export default function MoviesScreen() {
  // const authInfo = useAppSelector((state) => state.auth);
  // console.log("Store data: ", JSON.stringify(authInfo, null, 3));
  const { data: movies, error, isLoading } = usePopularMovies();


  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Text>Failed to fetch Movies</Text>;
  }

  const popularData = movies?.popular.results;
  const inTheaterData = movies?.inTheater.results;
  const upcomingData = movies?.upcoming.results;
  const topRatedData = movies?.topRated.results;

  return (
    <ScrollView style={styles.container}>
      <HorizontalFlatList title={"Popular"} movies={popularData} Item={VerticalCard} />
      <HorizontalFlatList title={"In Theaters"} movies={inTheaterData} Item={HorizontalCard} />
      <HorizontalFlatList title={"Upcoming"} movies={upcomingData} Item={VerticalCard} />
      <HorizontalFlatList title={"Top Rated"} movies={topRatedData} Item={VerticalCard} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: ThemeColors.dark.background,
  },
});
