import { Colors } from "@/src/constants/Colors";
import { StyleSheet, FlatList, View } from "react-native";
import Loader from "@/src/components/ui/Loader";
import RowItem from "@/src/components/RowItem";
import { Stack } from "expo-router";
import ErrorBlock from "@/src/components/ui/ErrorBlock";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useAppSelector } from "@/src/store/store";
import { selectProfileLanguage } from "@/src/store/profile/profileSlice";
import { useTranslation } from "react-i18next";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ButtonWithIcon from "../ui/ButtonWithIcon";

type FetchFunction<T> = (
  type: string,
  appLanguage: string,
  id: string
) => UseInfiniteQueryResult<T>;

type Props<T> = {
  type: string;
  id: string;
  title: string;
  fetchFunction: FetchFunction<T>;
  dynamicPath: string;
};

export default function AllMoviesScreen<T>({
  type,
  id,
  title,
  fetchFunction,
  dynamicPath,
}: Props<T>) {
  const appLanguage = useAppSelector(selectProfileLanguage);

  const { t } = useTranslation();

  const offsetY = useSharedValue(0);
  const flatListRef = useAnimatedRef<FlatList>();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = fetchFunction(
    type,
    appLanguage,
    id
  );

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

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorBlock text={t("fetchError")} />;
  }

  const seen = new Set<string>();
  //@ts-ignore
  const generalData = data.pages
    //@ts-ignore
    .flatMap((arr) => arr.results)
    //@ts-ignore
    .filter((item) => {
      if (seen.has(item.id)) {
        return false;
      } else {
        seen.add(item.id);
        return true;
      }
    });

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: title }} />
      <Animated.FlatList
        ref={flatListRef}
        data={generalData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RowItem data={item} dynamicPath={dynamicPath} />}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <Loader /> : null}
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
