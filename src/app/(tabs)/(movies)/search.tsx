import { useSearchMovies } from "@/src/api/movies";
import SearchScreen from "@/src/components/screens/SearchScreen";

export default function Search() {
  return (
    <SearchScreen
      fetchFunction={useSearchMovies}
      dynamicPath="/(tabs)/(movies)/"
      placeholder="Serach Movies"
    />
  );
}

