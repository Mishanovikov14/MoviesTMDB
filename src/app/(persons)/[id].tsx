import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors, ThemeColors } from "@/src/constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import { usePersonDetails } from "@/src/api/persons";
import Loader from "@/src/components/ui/Loader";
import { MainStyles } from "@/src/constants/Style";
import TextWithTitle from "@/src/components/ui/TextWithTitle";
import { formatDate } from "@/src/utils/dateFormating";
import VerticalCard from "@/src/components/cards/VerticalCard";
import HorizontalFlatList from "@/src/components/lists/HorizontalFlatList";

export default function PersonDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = typeof idString === "string" ? idString : idString[0];

  const { data: details, error, isLoading } = usePersonDetails(id);

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
      <View style={styles.errorContainer}>
        <Stack.Screen options={{ title: "" }} />
        <Text style={styles.text}>Failed to fetch Person Details. Please try again!</Text>
      </View>
    );
  }

  // const tvCredits = details.tv_credits.cast; //? crew
  // const movieCredits = details.movie_credits.cast; //? crew

  return (
    <ScrollView style={styles.container}>
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
          <TextWithTitle title="Birthplace" text={details.place_of_birth} />
          <TextWithTitle title="Date of birth" text={formatDate(details.birthday)} />
          {details.deathday && (
            <TextWithTitle title="Date of death" text={formatDate(details.deathday)} />
          )}
        </View>
      </View>

      <View style={styles.biographyContainer}>
        <TextWithTitle title="Biography" text={details.biography} />
      </View>

      {/* {movieCredits.length > 0 && (
        <HorizontalFlatList
          title={"Movies"}
          data={movieCredits}
          Item={VerticalCard}
          path="/(tabs)/(movies)/allMovies"
        />
      )}

      {tvCredits.length > 0 && (
        <HorizontalFlatList
          title={"TV Shows"}
          data={tvCredits}
          Item={VerticalCard}
          path="/(tabs)/(movies)/allShows"
        />
      )} */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: ThemeColors.dark.background,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: ThemeColors.dark.background,
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

  text: {
    color: Colors.PRIMARY,
    fontSize: MainStyles.FONTSIZE,
  },

  personName: {
    color: Colors.PRIMARY,
    fontSize: MainStyles.FONTSIZE,
    fontWeight: "bold",
    marginBottom: 10,
  },
});