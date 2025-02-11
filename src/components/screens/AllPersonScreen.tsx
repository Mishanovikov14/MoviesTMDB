import { Colors } from "@/src/constants/Colors";
import { StyleSheet, FlatList, View } from "react-native";
import PersonRowItem from "@/src/components/PersonRowItem";
import { PersonCard } from "@/src/constants/Types";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ButtonWithIcon from "../ui/ButtonWithIcon";

export default function AllPersonsScreen({
  data,
  dynamicPath,
}: {
  data: PersonCard[];
  dynamicPath: string;
}) {
  const offsetY = useSharedValue(0);
  const flatListRef = useAnimatedRef<FlatList>();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      offsetY.value = event.contentOffset.y;
    },
  });

  const handleScrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const buttonStyle = useAnimatedStyle(() => {
    return {
      opacity:
        offsetY.value > 500 ? withTiming(1, { duration: 500 }) : withTiming(0, { duration: 500 }),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={({ item }) => <PersonRowItem data={item} dynamicPath={dynamicPath} />}
        onScroll={scrollHandler}
      />

      <Animated.View style={[styles.scrollButtonContainer, buttonStyle]}>
        <ButtonWithIcon onPress={handleScrollToTop} iconName="arrow-up" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.DARK,
  },

  scrollButtonContainer: {
    position: "absolute",
    bottom: 40,
    right: 40,
  },
});
