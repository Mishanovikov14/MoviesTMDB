import { useSearchParams } from "expo-router/build/hooks";
import AllItemsScreen from "@/src/components/screens/AllItemsScreen";
import { useAllTVShows } from "@/src/api/tv-Shows";

export default function SimilarTVShowScreen() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  return (
    <AllItemsScreen type={"similar"} id={id} title={"Similar"} fetchFunction={useAllTVShows} dynamicPath={`/(tabs)/(favorite)/(tv-show)/`}/>
  );
}
