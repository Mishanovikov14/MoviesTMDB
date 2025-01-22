import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/Colors";

export default function FavoriteButton({
  isFavorite,
  onPress,
}: {
  isFavorite: boolean;
  onPress: () => void;
}) {
  return (
    //onPressIn solves the problem of the header button being triggered
    <Pressable onPressIn={onPress}>
        <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={Colors.FAVORITE} />
    </Pressable>
  );
}
