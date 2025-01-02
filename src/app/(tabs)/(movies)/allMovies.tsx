import { useAllMovies } from "@/src/api/movies";
import { useSearchParams } from "expo-router/build/hooks";
import AllItemsScreen from "@/src/components/screens/AllItemsScreen";

export default function AllMoviesScreen() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "";
  const id = searchParams.get("id") || "";

  const All_TYPE: Record<string, string> = {
    popular: "Popular",
    inTheater: "In Theater",
    topRated: "Top Rated",
    upcoming: "Upcomming Movies",
    similar: "Similar",
  };

  return (
    <AllItemsScreen type={type} id={id} title={All_TYPE[type]} fetchFunction={useAllMovies} dynamicPath="/(tabs)/(movies)/"/>
  );
}
