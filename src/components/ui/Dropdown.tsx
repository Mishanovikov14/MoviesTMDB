import { useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { MainStyles } from "@/src/constants/Style";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";

export default function Dropdown({
  onSelect,
  labelText,
  data,
}: {
  onSelect: (langCode: string) => void;
  labelText: string;
  data: { code: string; label: string }[];
}) {
  const [visible, setVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(data[0]);

  const rotateAnim = useSharedValue(0);

  const toggleDropdown = () => {
    setVisible((prevState) => !prevState);

    rotateAnim.value = withTiming(visible ? 0 : 1, {
      duration: 200,
      easing: Easing.ease,
    });
  };

  const handleSelect = (item: { code: string; label: string }) => {
    setSelectedLanguage(item);
    onSelect(item.code);

    rotateAnim.value = withTiming(0, { duration: 300, easing: Easing.ease });
    setVisible(false);
  };

  const arrowStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotateAnim.value * 180}deg`,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>{labelText}</Text>
        <Pressable
          style={styles.languageContainer}
          onPress={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
        >
          <Text style={styles.buttonText}>{selectedLanguage.label}</Text>
          <Animated.View style={arrowStyle}>
            <MaterialIcons name="arrow-drop-down" size={24} color={Colors.DARK} />
          </Animated.View>
        </Pressable>
      </View>

      {visible && (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.dropdown}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <Pressable style={styles.item} onPress={() => handleSelect(item)}>
                <Text style={styles.itemText}>{item.label}</Text>
              </Pressable>
            )}
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },

  dropdownContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 4,
    paddingVertical: 8,
    justifyContent: "space-between",
  },

  languageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    minWidth: 160,
  },

  label: {
    fontSize: MainStyles.FONTSIZE,
    color: Colors.DARK,
    marginRight: 10,
    paddingHorizontal: 8,
  },

  buttonText: {
    fontSize: MainStyles.FONTSIZE,
    color: Colors.DARK,
  },

  dropdown: {
    position: "absolute",
    right: 0,
    top: 50,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 4,
    minWidth: 160,
  },

  item: {
    padding: 8,
  },

  itemText: {
    fontSize: MainStyles.FONTSIZE,
    color: Colors.DARK,
  },
});
