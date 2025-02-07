import { ScrollView, StyleSheet } from "react-native";
import { Colors } from "../../../constants/Colors";
import Loader from "@/src/components/ui/Loader";
import { useMovies } from "@/src/api/movies";
import HorizontalFlatList from "@/src/components/lists/HorizontalFlatList";
import VerticalCard from "@/src/components/cards/VerticalCard";
import HorizontalCard from "@/src/components/cards/HorizontalCard";
import ErrorBlock from "@/src/components/ui/ErrorBlock";
import { useAppSelector } from "@/src/store/store";
import { selectProfileLanguage } from "@/src/store/profile/profileSlice";
import { useTranslation } from "react-i18next";

export default function MoviesScreen() {
  const appLanguage = useAppSelector(selectProfileLanguage);

  const { t } = useTranslation();

  const { data: movies, error, isLoading } = useMovies(appLanguage);
  const dynamicPath = "/(tabs)/(movies)/";

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorBlock text={t("movieFetchError")} />;
  }

  const popularData = movies?.popular?.results || [];
  const inTheaterData = movies?.inTheater?.results || [];
  const upcomingData = movies?.upcoming?.results || [];
  const topRatedData = movies?.topRated?.results || [];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HorizontalFlatList
        title={t("popular")}
        data={popularData}
        Item={VerticalCard}
        path="/(tabs)/(movies)/allMovies?type=popular"
        dynamicPath={dynamicPath}
        type="movie"
      />
      <HorizontalFlatList
        title={t("nowInTheaters")}
        data={inTheaterData}
        Item={HorizontalCard}
        path="/(tabs)/(movies)/allMovies?type=inTheater"
        dynamicPath={dynamicPath}
        type="movie"
      />
      <HorizontalFlatList
        title={t("upcoming")}
        data={upcomingData}
        Item={VerticalCard}
        path="/(tabs)/(movies)/allMovies?type=upcoming"
        dynamicPath={dynamicPath}
        type="movie"
      />
      <HorizontalFlatList
        title={t("topRated")}
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
