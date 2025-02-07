import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { Stack, useLocalSearchParams, useSegments } from "expo-router";
import { usePersonDetails } from "@/src/api/persons";
import Loader from "@/src/components/ui/Loader";
import { MainStyles } from "@/src/constants/Style";
import TextWithTitle from "@/src/components/ui/TextWithTitle";
import { formatDate } from "@/src/utils/dateFormating";
import VerticalCard from "@/src/components/cards/VerticalCard";
import HorizontalFlatList from "@/src/components/lists/HorizontalFlatList";
import ErrorBlock from "../ui/ErrorBlock";
import { useAppSelector } from "@/src/store/store";
import { selectProfileLanguage } from "@/src/store/profile/profileSlice";
import { useTranslation } from "react-i18next";

export default function PersonDetailsScreen({ tab }: { tab: string }) {
  const appLanguage = useAppSelector(selectProfileLanguage);

  const { t } = useTranslation();

  const { id: idString } = useLocalSearchParams();
  const id = typeof idString === "string" ? idString : idString[0];

  const { data: details, error, isLoading } = usePersonDetails(id, appLanguage);
  let isMovieTab = tab === "(movies)";

  if (tab === "(favorite)") {
    const segments = useSegments();

    isMovieTab = segments[2] === "(movie)";
  }

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
        <ErrorBlock text={t("personDetailsFetchError")} />
      </>
    );
  }

  const tvCredits = details.tv_credits.cast;
  const movieCredits = details.movie_credits.cast;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ title: details.name }} />
      <View style={styles.personDetailsContainer}>
        <Image
          style={styles.personalPhoto}
          source={
            details.profile_path
              ? { uri: `https://image.tmdb.org/t/p/w342${details.profile_path}` }
              : require("../../../assets/images/no-pictures.png")
          }
        />
        <View>
          <Text style={styles.personName}>{details.name}</Text>
          <TextWithTitle title={t("birthplace")} text={details.place_of_birth} />
          <TextWithTitle title={t("dateOfBirth")} text={formatDate(details.birthday, appLanguage)} />
          {details.deathday && (
            <TextWithTitle title={t("dateOfDeath")} text={formatDate(details.deathday, appLanguage)} />
          )}
        </View>
      </View>

      {details.biography.length > 0 && (
        <View style={styles.biographyContainer}>
          <TextWithTitle title={t("biography")} text={details.biography} />
        </View>
      )}

      {isMovieTab && movieCredits.length > 0 && (
        <HorizontalFlatList
          title={t("movies")}
          data={movieCredits}
          Item={VerticalCard}
          path={``}
          dynamicPath={`/(tabs)/${tab}/`}
          type="movie"
        />
      )}

      {!isMovieTab && tvCredits.length > 0 && (
        <HorizontalFlatList
          title={t("tvShows")}
          data={tvCredits}
          Item={VerticalCard}
          path={``}
          dynamicPath={`/(tabs)/${tab}/`}
          type="show"
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.DARK,
  },

  personDetailsContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },

  biographyContainer: {
    marginBottom: 14,
  },

  personalPhoto: {
    width: 140,
    height: 210,
    borderRadius: 5,
    borderColor: Colors.LIGHT_GREY,
    borderWidth: 2,
    marginRight: 10,
  },

  personName: {
    color: Colors.PRIMARY,
    fontSize: MainStyles.FONTSIZE,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
