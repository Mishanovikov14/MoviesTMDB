import { ThemeColors } from "@/src/constants/Colors";
import { StyleSheet, FlatList, View } from "react-native";
import Loader from "@/src/components/ui/Loader";
import { useSearchParams } from "expo-router/build/hooks";
import RowItem from "@/src/components/RowItem";
import { Stack } from "expo-router";
import ErrorBlock from "@/src/components/ui/ErrorBlock";
import { useAllTVShows } from "@/src/api/tv-Shows";

export default function AllMoviesScreen() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "";
  const id = searchParams.get("id") || "";

  const All_TYPE: Record<string, string> = {
    popular: "Popular",
    onTheAir: "On the air",
    topRated: "Top Rated",
    airingToday: "Airing Today",
    similar: "Similar",
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useAllTVShows(
    type,
    id
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorBlock text="Failed to fetch TV Shows. Please try again!" />;
  }

  const seen = new Set();
  const shows = data.pages
    // @ts-ignore
    .flatMap((arr) => arr.results)
    // @ts-ignore
    .filter((item) => {
      if (seen.has(item.id)) {
        return false;
      } else {
        seen.add(item.id);
        return true;
      }
    });

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: All_TYPE[type] }} />
      <FlatList
        data={shows}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RowItem data={item} dynamicPath="/(tabs)/(tv-shows)/" />}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <Loader /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: ThemeColors.dark.background,
  },
});
