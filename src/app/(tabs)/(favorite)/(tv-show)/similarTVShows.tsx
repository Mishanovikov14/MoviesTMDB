import { useSearchParams } from "expo-router/build/hooks";
import AllItemsScreen from "@/src/components/screens/AllItemsScreen";
import { useAllTVShows } from "@/src/api/tv-shows";
import { useTranslation } from "react-i18next";

export default function SimilarTVShowScreen() {
  const searchParams = useSearchParams();

  const { t } = useTranslation();

  const id = searchParams.get("id") || "";

  return (
    <AllItemsScreen type={"similar"} id={id} title={t("similar")} fetchFunction={useAllTVShows} dynamicPath={`/(tabs)/(favorite)/(tv-show)/`}/>
  );
}
