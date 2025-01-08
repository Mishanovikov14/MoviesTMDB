import { Colors } from "@/src/constants/Colors";
import { StyleSheet, FlatList, View } from "react-native";
import Loader from "@/src/components/ui/Loader";
import RowItem from "@/src/components/RowItem";
import { Stack } from "expo-router";
import ErrorBlock from "@/src/components/ui/ErrorBlock";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

type FetchFunction<T> = (type: string, id: string) => UseInfiniteQueryResult<T>;

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
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = fetchFunction(
    type,
    id
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorBlock text="Failed to fetch. Please try again!" />;
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
      <FlatList
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
      />
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
});
