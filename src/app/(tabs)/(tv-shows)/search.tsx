import { useSearchTVShows } from "@/src/api/tv-shows";
import SearchScreen from "@/src/components/screens/SearchScreen";

export default function Search() {
  return (
    <SearchScreen
      fetchFunction={useSearchTVShows}
      dynamicPath="/(tabs)/(tv-shows)/"
      placeholder="Serach TV Shows"
    />
  );
}

