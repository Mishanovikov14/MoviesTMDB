import { useFavoriteMovies } from "@/src/api/favourite";
import RowItem from "@/src/components/RowItem";
import ErrorBlock from "@/src/components/ui/ErrorBlock";
import Loader from "@/src/components/ui/Loader";
import { ThemeColors } from "@/src/constants/Colors";
import { selectFavoriteMovies, selectFavoriteTVShows } from "@/src/store/favorites/favoriteSlice";
import { useAppSelector } from "@/src/store/store";
import { FlatList, StyleSheet, View } from "react-native";

export default function FavouriteScreen() {
  const favoriteIds = useAppSelector(selectFavoriteMovies) || [];
  const favoriteShowIds = useAppSelector(selectFavoriteTVShows) || [];

  const {data: movies, isLoading, error} = useFavoriteMovies(favoriteIds, favoriteShowIds);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorBlock text="Failed to fetch Favorites. Please try again!"/>
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={({ item }) => <RowItem data={item} tab="(favorite)"/>}
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
