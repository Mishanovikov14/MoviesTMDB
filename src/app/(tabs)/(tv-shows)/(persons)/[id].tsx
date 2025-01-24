import PersonDetailsScreen from "@/src/components/screens/PersonDetailsScreen";
import TVShowDetailsScreen from "@/src/components/screens/TVShowDetailsScreen";
import { useLocalSearchParams } from "expo-router";

export default function MoviePersonDetails() {
  const { type } = useLocalSearchParams();
  
  return (
    <>
      {type === "show" ? (
        <TVShowDetailsScreen tab="(tv-shows)" />
      ) : (
        <PersonDetailsScreen tab="(tv-shows)" />
      )}
    </>
  );
}
