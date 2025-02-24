import { useSearchParams } from "expo-router/build/hooks";
import AllItemsScreen from "@/src/components/screens/AllItemsScreen";
import { useTranslation } from "react-i18next";
import { useAllTVShows } from "../../../../api/tv-shows/index";

export default function SimilarTVShowScreen() {
  const searchParams = useSearchParams();

  const { t } = useTranslation();

  const id = searchParams.get("id") || "";

  return (
    <AllItemsScreen type={"similar"} id={id} title={t("similar")} fetchFunction={useAllTVShows} dynamicPath={`/(tabs)/(favorite)/(tv-show)/`}/>
  );
}
