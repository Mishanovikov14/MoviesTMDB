import { useSearchParams } from "expo-router/build/hooks";
import { useAllTVShows } from "@/src/api/tv-shows";
import AllItemsScreen from "@/src/components/screens/AllItemsScreen";
import { useTranslation } from "react-i18next";

export default function AllMoviesScreen() {
  const searchParams = useSearchParams();

  const { t } = useTranslation();

  const type = searchParams.get("type") || "";
  const id = searchParams.get("id") || "";

  const All_TYPE: Record<string, string> = {
    popular: t("popular"),
    onTheAir: t("onTheAir"),
    topRated: t("topRated"),
    airingToday: t("airingToday"),
    similar: t("similar"),
  };

  return (
    <AllItemsScreen type={type} id={id} title={All_TYPE[type]} fetchFunction={useAllTVShows} dynamicPath="/(tabs)/(tv-shows)/"/>
  );
}
