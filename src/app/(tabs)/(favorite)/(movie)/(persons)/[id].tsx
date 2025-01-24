import MovieDetailsScreen from "@/src/components/screens/MovieDetailsScreen";
import PersonDetailsScreen from "@/src/components/screens/PersonDetailsScreen";
import { useLocalSearchParams } from "expo-router";

export default function MoviePersonDetails() {
  const { type } = useLocalSearchParams();

  return (
    <>
      {type === "movie" ? (
        <MovieDetailsScreen tab="(favorite)" />
      ) : (
        <PersonDetailsScreen tab="(favorite)" />
      )}
    </>
  );
}
