import { ScrollView, StyleSheet } from "react-native";
import { Colors } from "../../../constants/Colors";
import Loader from "@/src/components/ui/Loader";
import HorizontalFlatList from "@/src/components/lists/HorizontalFlatList";
import VerticalCard from "@/src/components/cards/VerticalCard";
import HorizontalCard from "@/src/components/cards/HorizontalCard";
import ErrorBlock from "@/src/components/ui/ErrorBlock";
import { useTVShows } from "@/src/api/tv-shows";
import { useAppSelector } from "@/src/store/store";
import { selectProfileLanguage } from "@/src/store/profile/profileSlice";
import { useTranslation } from "react-i18next";

export default function TVShowsScreen() {
  const appLanguage = useAppSelector(selectProfileLanguage);

  const { t } = useTranslation();

  const { data: tvShows, error, isLoading } = useTVShows(appLanguage);
  const dynamicPath = "/(tabs)/(tv-shows)/";

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorBlock text={t("tvShowFetchError")} />;
  }

  const popularData = tvShows?.popular?.results || [];
  const topRatedData = tvShows?.topRated?.results || [];
  const airingTodayData = tvShows?.onTheAir?.results || [];
  const onTheAirData = tvShows?.airingToday?.results || [];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HorizontalFlatList
        title={t("popular")}
        data={popularData}
        Item={VerticalCard}
        path="/(tabs)/(tv-shows)/allShows?type=popular"
        dynamicPath={dynamicPath}
        type="show"
      />
      <HorizontalFlatList
        title={t("topRated")}
        data={topRatedData}
        Item={HorizontalCard}
        path="/(tabs)/(tv-shows)/allShows?type=topRated"
        dynamicPath={dynamicPath}
        type="show"
      />
      <HorizontalFlatList
        title={t("airingToday")}
        data={airingTodayData}
        Item={VerticalCard}
        path="/(tabs)/(tv-shows)/allShows?type=airingToday"
        dynamicPath={dynamicPath}
        type="show"
      />
      <HorizontalFlatList
        title={t("onTheAir")}
        data={onTheAirData}
        Item={VerticalCard}
        path="/(tabs)/(tv-shows)/allShows?type=onTheAir"
        dynamicPath={dynamicPath}
        type="show"
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
