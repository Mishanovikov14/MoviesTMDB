import { useSearchMovies } from "@/src/api/movies";
import RowItem from "@/src/components/RowItem";
import ButtonWithIcon from "@/src/components/ui/ButtonWithIcon";
import ErrorBlock from "@/src/components/ui/ErrorBlock";
import { Colors } from "@/src/constants/Colors";
import { MovieCard, TVShowCard } from "@/src/constants/Types";
import { selectProfileLanguage } from "@/src/store/profile/profileSlice";
import { useAppSelector } from "@/src/store/store";
import { Ionicons } from "@expo/vector-icons";
import { UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function SearchScreen({
  fetchFunction,
  dynamicPath,
  placeholder,
}: {
  fetchFunction: (query: string, language: string) => UseQueryResult<{ results: (MovieCard | TVShowCard)[] }, Error>;
  dynamicPath: string;
  placeholder: string;
}) {
  const [searchValue, setSearchValue] = useState("");
  const [queryString, setQueryString] = useState("");

  const appLanguage = useAppSelector(selectProfileLanguage);

  const { data, error } = fetchFunction(queryString, appLanguage);

  const handleSearchTextChange = (text: string) => {
    setSearchValue(text);

    let query = text.trim();

    if (query.length > 1) {
      query = query.split(" ").join("+");
    }

    setQueryString(query);
  };

  const handleClear = () => {
    setSearchValue("");
    setQueryString("");
  };

  if (error) {
    return <ErrorBlock text="Failed to search. Please try again!" />;
  }

  const searchResult = data?.results || [];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name={"search"} color={Colors.SECONDARY} size={24} style={styles.icon} />

          <TextInput
            autoFocus={true}
            value={searchValue}
            onChangeText={(text) => handleSearchTextChange(text)}
            style={styles.searchInput}
            placeholder={placeholder}
            placeholderTextColor={Colors.GREY}
            numberOfLines={1}
            returnKeyType="search"
          />

          {searchValue.length > 0 && (
            <ButtonWithIcon
              onPress={handleClear}
              iconColor={Colors.SECONDARY}
              iconName="close"
              style={styles.button}
            />
          )}
        </View>

        {searchResult.length > 0 && (
          <FlatList
            data={searchResult}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <RowItem data={item} dynamicPath={dynamicPath} />}
            style={styles.searchContent}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK,
  },

  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.DARK_GREY,
    height: 50,
  },

  searchInput: {
    flex: 1,
    color: Colors.LIGHT_GREY,
  },

  icon: {
    marginHorizontal: 20,
  },

  button: {
    marginHorizontal: 20,
    backgroundColor: "transparent",
  },

  searchContent: {
    padding: 20,
  },
});
