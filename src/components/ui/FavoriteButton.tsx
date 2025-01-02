import { Pressable, StyleSheet} from "react-native";
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
    <Pressable onPress={onPress}>
      <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={Colors.FAVORITE} />
    </Pressable>
  );
}

const styles = StyleSheet.create({});
