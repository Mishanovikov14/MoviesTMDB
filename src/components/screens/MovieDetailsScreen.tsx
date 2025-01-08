import { ScrollView, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import { useMovieDetails } from "@/src/api/movies";
import Loader from "@/src/components/ui/Loader";
import HorizontalFlatList from "@/src/components/lists/HorizontalFlatList";
import PersonCard from "@/src/components/cards/PersonCard";
import VideoList from "@/src/components/lists/VideoList";
import { Video } from "@/src/constants/Types";
import VerticalCard from "@/src/components/cards/VerticalCard";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import { clearCredits, setCredits } from "@/src/store/credits/creditsSlice";
import { useAddToFavorite } from "@/src/api/favourite";
import {
  selectFavoriteMovies,
  selectFavoriteTVShows,
  setFavorites,
} from "@/src/store/favorites/favoriteSlice";
import { useCallback, useEffect, useState } from "react";
import FavoriteButton from "@/src/components/ui/FavoriteButton";
import { showModal } from "@/src/store/modal/modalSlice";
import ErrorBlock from "../ui/ErrorBlock";
import DetailsHeader from "../DetailsHeader";
import { useFocusEffect } from "@react-navigation/native";

export default function MovieDetailsScreen({ tab }: { tab: string }) {
  const { movieId: idString } = useLocalSearchParams();
  const { mutateAsync } = useAddToFavorite();
  const id = typeof idString === "string" ? idString : idString[0];

  const favoriteIds = useAppSelector(selectFavoriteMovies) || [];
  const favoriteTVIds = useAppSelector(selectFavoriteTVShows) || [];

  const [isFavorite, setIsFavorite] = useState(favoriteIds.includes(id));
  const [isReverting, setIsReverting] = useState(false);

  const dispatch = useAppDispatch();

  const { data: details, error, isLoading } = useMovieDetails(id);

  let dynamicPath = `/(tabs)/${tab}/`;
  let path = `/(tabs)/${tab}/allMovies?type=similar&id=${id}`;

  if (tab === "(favorite)") {
    dynamicPath = `/(tabs)/${tab}/(movie)/`;
    path = `/(tabs)/${tab}/(movie)/similarMovies?id=${id}`;
  }

  useFocusEffect(
    useCallback(() => {
      if (isLoading) {
        dispatch(clearCredits());
      }

      if (details?.credits) {
        dispatch(setCredits(details.credits));
      }
    }, [details?.credits, isLoading, dispatch])
  );

  useEffect(() => {
    if (isReverting) {
      dispatch(
        showModal({
          title: "Something went wrong",
          message: "Plese try again!",
          borderColor: Colors.ERROR,
        })
      );
    }
  }, [isReverting, dispatch]);

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
      <>
        <Stack.Screen options={{ title: "" }} />
        <ErrorBlock text="Failed to fetch Movie Details. Please try again!" />
      </>
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

  const handleAddFavorite = async () => {
    const updatedFavoriteIds = isFavorite
      ? favoriteIds.filter((item) => item !== id)
      : [...favoriteIds, id];

    const favorites = { movieIds: updatedFavoriteIds, tvShowIds: favoriteTVIds };

    setIsFavorite(!isFavorite);

    try {
      await mutateAsync(favorites);

      dispatch(setFavorites(favorites));
    } catch (error) {
      setIsReverting(true);
      setIsFavorite(isFavorite);
      dispatch(setFavorites({ movieIds: favoriteIds, tvShowIds: favoriteTVIds }));
    } finally {
      setIsReverting(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen
        options={{
          title: details.title,
          headerRight: () => <FavoriteButton isFavorite={isFavorite} onPress={handleAddFavorite} />,
        }}
      />

      <DetailsHeader details={details} genres={genres} />

      {castData.length > 0 && (
        <HorizontalFlatList
          title={"Cast & Crew"}
          data={castData}
          Item={PersonCard}
          path={`/(tabs)/${tab}/(persons)/(credits)/castList`}
          dynamicPath={dynamicPath + "(persons)/"}
        />
      )}

      {videos.length > 0 && <VideoList title="Trailers" videos={videos} />}

      {similar.length > 0 && (
        <HorizontalFlatList
          title={"Similar"}
          data={similar}
          Item={VerticalCard}
          path={path}
          dynamicPath={dynamicPath}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK,
  },
});
