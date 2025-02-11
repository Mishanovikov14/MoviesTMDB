import { useAppSelector } from "@/src/store/store";
import { selectCrew } from "@/src/store/credits/creditsSlice";
import AllPersonsScreen from "@/src/components/screens/AllPersonScreen";

export default function PersonsScreen() {
  const crew = useAppSelector(selectCrew) || [];

  return <AllPersonsScreen data={crew} dynamicPath="/(tabs)/(favorite)/(persons)/" />;
}
