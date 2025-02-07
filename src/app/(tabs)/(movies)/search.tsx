import { useSearchMovies } from "@/src/api/movies";
import SearchScreen from "@/src/components/screens/SearchScreen";
import { useTranslation } from "react-i18next";

export default function Search() {
  const { t } = useTranslation();

  return (
    <SearchScreen
      fetchFunction={useSearchMovies}
      dynamicPath="/(tabs)/(movies)/"
      placeholder={t("searchMovie")}
    />
  );
}
