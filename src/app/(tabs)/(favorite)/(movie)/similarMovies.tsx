import { useAllMovies } from "@/src/api/movies";
import { useSearchParams } from "expo-router/build/hooks";
import AllItemsScreen from "@/src/components/screens/AllItemsScreen";
import { useTranslation } from "react-i18next";

export default function SimilarMoviesScreen() {
  const searchParams = useSearchParams();

  const { t } = useTranslation();

  const id = searchParams.get("id") || "";

  return (
    <AllItemsScreen type={"similar"} id={id} title={t("similar")} fetchFunction={useAllMovies} dynamicPath={`/(tabs)/(favorite)/(movie)/`}/>
  );
}
