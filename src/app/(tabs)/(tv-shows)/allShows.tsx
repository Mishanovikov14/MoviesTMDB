import { useSearchParams } from "expo-router/build/hooks";
import { useAllTVShows } from "@/src/api/tv-shows";
import AllItemsScreen from "@/src/components/screens/AllItemsScreen";

export default function AllMoviesScreen() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "";
  const id = searchParams.get("id") || "";

  const All_TYPE: Record<string, string> = {
    popular: "Popular",
    onTheAir: "On the air",
    topRated: "Top Rated",
    airingToday: "Airing Today",
    similar: "Similar",
  };

  return (
    <AllItemsScreen type={type} id={id} title={All_TYPE[type]} fetchFunction={useAllTVShows} dynamicPath="/(tabs)/(tv-shows)/"/>
  );
}
