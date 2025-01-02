import { ScrollView, StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/Colors";
import Loader from "@/src/components/ui/Loader";
import HorizontalFlatList from "@/src/components/lists/HorizontalFlatList";
import VerticalCard from "@/src/components/cards/VerticalCard";
import HorizontalCard from "@/src/components/cards/HorizontalCard";
import ErrorBlock from "@/src/components/ui/ErrorBlock";
import { useTVShows } from "@/src/api/tv-Shows";

export default function TVShowsScreen() {
  const { data: tvShows, error, isLoading } = useTVShows();
  const dynamicPath = "/(tabs)/(tv-shows)/";

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorBlock text="Failed to fetch TV Shows. Please try again!" />;
  }

  const popularData = tvShows?.popular?.results || [];
  const topRatedData = tvShows?.topRated?.results || [];
  const airingTodayData = tvShows?.onTheAir?.results || [];
  const onTheAirData = tvShows?.airingToday?.results || [];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HorizontalFlatList
        title={"Popular"}
        data={popularData}
        Item={VerticalCard}
        path="/(tabs)/(tv-shows)/allShows?type=popular"
        dynamicPath={dynamicPath}
      />
      <HorizontalFlatList
        title={"Top Rated"}
        data={topRatedData}
        Item={HorizontalCard}
        path="/(tabs)/(tv-shows)/allShows?type=topRated"
        dynamicPath={dynamicPath}
      />
      <HorizontalFlatList
        title={"Airing today"}
        data={airingTodayData}
        Item={VerticalCard}
        path="/(tabs)/(tv-shows)/allShows?type=airingToday"
        dynamicPath={dynamicPath}
      />
      <HorizontalFlatList
        title={"On the Air"}
        data={onTheAirData}
        Item={VerticalCard}
        path="/(tabs)/(tv-shows)/allShows?type=onTheAir"
        dynamicPath={dynamicPath}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: ThemeColors.dark.background,
  },
});
