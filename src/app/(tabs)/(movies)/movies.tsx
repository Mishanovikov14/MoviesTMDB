import { ScrollView, StyleSheet } from "react-native";
import { Colors } from "../../../constants/Colors";
import Loader from "@/src/components/ui/Loader";
import { useMovies } from "@/src/api/movies";
import HorizontalFlatList from "@/src/components/lists/HorizontalFlatList";
import VerticalCard from "@/src/components/cards/VerticalCard";
import HorizontalCard from "@/src/components/cards/HorizontalCard";
import ErrorBlock from "@/src/components/ui/ErrorBlock";

export default function MoviesScreen() {
  const { data: movies, error, isLoading } = useMovies();
  const dynamicPath = "/(tabs)/(movies)/";

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorBlock text="Failed to fetch Movies. Please try again!" />;
  }

  const popularData = movies?.popular?.results || [];
  const inTheaterData = movies?.inTheater?.results || [];
  const upcomingData = movies?.upcoming?.results || [];
  const topRatedData = movies?.topRated?.results || [];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HorizontalFlatList
        title={"Popular"}
        data={popularData}
        Item={VerticalCard}
        path="/(tabs)/(movies)/allMovies?type=popular"
        dynamicPath={dynamicPath}
        type="movie"
      />
      <HorizontalFlatList
        title={"Now in Theaters"}
        data={inTheaterData}
        Item={HorizontalCard}
        path="/(tabs)/(movies)/allMovies?type=inTheater"
        dynamicPath={dynamicPath}
        type="movie"
      />
      <HorizontalFlatList
        title={"Upcoming"}
        data={upcomingData}
        Item={VerticalCard}
        path="/(tabs)/(movies)/allMovies?type=upcoming"
        dynamicPath={dynamicPath}
        type="movie"
      />
      <HorizontalFlatList
        title={"Top Rated"}
        data={topRatedData}
        Item={HorizontalCard}
        path="/(tabs)/(movies)/allMovies?type=topRated"
        dynamicPath={dynamicPath}
        type="movie"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.DARK,
  },
});
