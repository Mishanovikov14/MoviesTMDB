import { useAllMovies } from "@/src/api/movies";
import { useSearchParams } from "expo-router/build/hooks";
import AllItemsScreen from "@/src/components/screens/AllItemsScreen";
import { useTranslation } from "react-i18next";

export default function AllMoviesScreen() {
  const searchParams = useSearchParams();

  const { t } = useTranslation();

  const type = searchParams.get("type") || "";
  const id = searchParams.get("id") || "";

  const All_TYPE: Record<string, string> = {
    popular: t("popular"),
    inTheater: t("inTheater"),
    topRated: t("topRated"),
    upcoming: t("upcommingMovies"),
    similar: t("similar"),
  };

  return (
    <AllItemsScreen
      type={type}
      id={id}
      title={All_TYPE[type]}
      fetchFunction={useAllMovies}
      dynamicPath="/(tabs)/(movies)/"
    />
  );
}
