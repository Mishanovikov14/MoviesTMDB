import { Colors, ThemeColors } from "@/src/constants/Colors";
import { StyleSheet, FlatList, Text, View, ActivityIndicator } from 'react-native';
import { useAllMovies } from "@/src/api/movies";
import Loader from "@/src/components/ui/Loader";
import { useSearchParams } from "expo-router/build/hooks";
import RowItem from "@/src/components/RowItem";
import { Stack } from "expo-router";

const AllMoviesScreen = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || "";

  const All_TYPE: Record<string, string> = {
    popular: "Popular",
    inTheater: "In Theater",
    topRated: "Top Rated",
    upcoming: "Upcomming Movies",
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useAllMovies(type);

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

  const seen = new Set();
  const movies = data.pages
    // @ts-ignore
    .flatMap(arr => arr.results)
    .filter(item => {
      if (seen.has(item.id)) {
        return false;
      } else {
        seen.add(item.id);
        return true;
      }
    });

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: All_TYPE[type]}}/>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RowItem data={item}/>}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator size="small" /> : null
        }
      />
    </View>
  );
};

export default AllMoviesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
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
  },
});