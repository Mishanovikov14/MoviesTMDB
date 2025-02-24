import { useSearchTVShows } from "@/src/api/tvShows";
import SearchScreen from "@/src/components/screens/SearchScreen";
import { useTranslation } from "react-i18next";

export default function Search() {
  const { t } = useTranslation();

  return (
    <SearchScreen
      fetchFunction={useSearchTVShows}
      dynamicPath="/(tabs)/(tv-shows)/"
      placeholder={t("searchTVShow")}
    />
  );
}
