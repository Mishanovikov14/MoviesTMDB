import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors, ThemeColors } from "../../../constants/Colors";
import Loader from "@/src/components/ui/Loader";
import { useMovies } from "@/src/api/movies";
import HorizontalFlatList from "@/src/components/lists/HorizontalFlatList";
import VerticalCard from "@/src/components/cards/VerticalCard";
import HorizontalCard from "@/src/components/cards/HorizontalCard";

export default function MoviesScreen() {
  const { data: movies, error, isLoading } = useMovies();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.text}>Failed to fetch Movies. Please try again!</Text>
      </View>
    );
  }

  const popularData = movies?.popular?.results || [];
  const inTheaterData = movies?.inTheater?.results || [];
  const upcomingData = movies?.upcoming?.results || [];
  const topRatedData = movies?.topRated?.results || [];

  return (
    <ScrollView style={styles.container}>
      <HorizontalFlatList title={"Popular"} data={popularData} Item={VerticalCard} path="/(tabs)/(movies)/allMovies?type=popular"/>
      <HorizontalFlatList title={"Now in Theaters"} data={inTheaterData} Item={HorizontalCard} path="/(tabs)/(movies)/allMovies?type=inTheater"/>
      <HorizontalFlatList title={"Upcoming"} data={upcomingData} Item={VerticalCard} path="/(tabs)/(movies)/allMovies?type=upcoming"/>
      <HorizontalFlatList title={"Top Rated"} data={topRatedData} Item={HorizontalCard} path="/(tabs)/(movies)/allMovies?type=topRated"/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: ThemeColors.dark.background,
  },

  errorContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: ThemeColors.dark.background,
    justifyContent: "center",
  },

  text: {
    color: Colors.PRIMARY,
    alignSelf: "center",
  },
});
