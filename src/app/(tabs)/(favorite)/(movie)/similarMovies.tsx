import { useAllMovies } from "@/src/api/movies";
import { useSearchParams } from "expo-router/build/hooks";
import AllItemsScreen from "@/src/components/screens/AllItemsScreen";

export default function SimilarMoviesScreen() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  return (
    <AllItemsScreen type={"similar"} id={id} title={"Similar"} fetchFunction={useAllMovies} dynamicPath={`/(tabs)/(favorite)/(movie)/`}/>
  );
}
