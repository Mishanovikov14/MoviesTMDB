
import PersonDetailsScreen from "@/src/components/screens/PersonDetailsScreen";
import TVShowDetailsScreen from "@/src/components/screens/TVShowDetailsScreen";
import { useLocalSearchParams } from "expo-router";

export default function TVShowPersonDetails() {
  const { type } = useLocalSearchParams();

  return (
    <>
      {type === "show" ? (
        <TVShowDetailsScreen tab="(favorite)" />
      ) : (
        <PersonDetailsScreen tab="(favorite)" />
      )}
    </>
  );
}
