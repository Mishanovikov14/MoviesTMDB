import { useAppSelector } from "@/src/store/store";
import { selectCast } from "@/src/store/credits/creditsSlice";
import AllPersonsScreen from "@/src/components/screens/AllPersonScreen";

export default function PersonsScreen() {
  const cast = useAppSelector(selectCast) || [];

  return <AllPersonsScreen data={cast} dynamicPath="/(tabs)/(tv-shows)/(persons)/" />;
}
