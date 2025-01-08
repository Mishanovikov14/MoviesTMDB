import { useFavoriteMovies } from "@/src/api/favourite";
import RowItem from "@/src/components/RowItem";
import ErrorBlock from "@/src/components/ui/ErrorBlock";
import Loader from "@/src/components/ui/Loader";
import { Colors } from "@/src/constants/Colors";
import { selectFavoriteMovies } from "@/src/store/favorites/favoriteSlice";
import { useAppSelector } from "@/src/store/store";
import { FlatList, StyleSheet, View } from "react-native";

export default function FavouriteMoviesScreen() {
  const favoriteIds = useAppSelector(selectFavoriteMovies) || [];

  const { data: movies, isLoading, error } = useFavoriteMovies(favoriteIds);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorBlock text="Failed to fetch Favorites Movies. Please try again!" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={({ item }) => <RowItem data={item} dynamicPath="/(tabs)/(favorite)/(movie)/" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.DARK,
  },
});
