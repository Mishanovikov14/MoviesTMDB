import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors } from "@/src/constants/Colors";
import { MainStyles } from "@/src/constants/Style";
import { MaterialIcons } from "@expo/vector-icons"; // Иконка стрелки
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const LANGUAGES = [
  { code: "en-US", label: "🇺🇸 English" }, // Флаг США
  { code: "uk", label: "🇺🇦 Українська" },
];

export default function Dropdown({ onSelect }: { onSelect: (langCode: string) => void }) {
  const [visible, setVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);

  const { t } = useTranslation();

  // Создание анимаций
  const fadeAnim = useSharedValue(0);
  const rotateAnim = useSharedValue(0);

  const toggleDropdown = () => {
    setVisible(!visible);
    // Анимация появления/исчезновения меню
    fadeAnim.value = withTiming(visible ? 0 : 1, {
      duration: 300,
      easing: Easing.ease,
    });
    // Поворот стрелки
    rotateAnim.value = withTiming(visible ? 0 : 1, {
      duration: 300,
      easing: Easing.ease,
    });
  };

  const handleSelect = (item: { code: string; label: string }) => {
    setSelectedLanguage(item);
    onSelect(item.code);
    // Скрыть меню с анимацией после выбора
    fadeAnim.value = withTiming(0, { duration: 300, easing: Easing.ease });
    rotateAnim.value = withTiming(0, { duration: 300, easing: Easing.ease });
    setVisible(false);
  };

  const closeDropdown = () => {
    setVisible(false);
    fadeAnim.value = withTiming(0, { duration: 300, easing: Easing.ease });
    rotateAnim.value = withTiming(0, { duration: 300, easing: Easing.ease });
  };

  // Стиль для анимации прозрачности
  const dropdownStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });

  // Стиль для анимации поворота стрелки
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
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <View style={styles.container}>
        <Pressable
          style={styles.dropdownContainer}
          onPress={(e) => {
            e.stopPropagation(); // Остановка всплытия
            toggleDropdown();
          }}
        >
          <Text style={styles.label}>{`${t("appLanguage")}:`}</Text>
          <View style={styles.languageContainer}>
            <Text style={styles.buttonText}>{selectedLanguage.label}</Text>
            <Animated.View style={arrowStyle}>
              <MaterialIcons name="arrow-drop-down" size={24} color={Colors.DARK} />
            </Animated.View>
          </View>
        </Pressable>

        {visible && (
          <Animated.View style={[styles.dropdown, dropdownStyle]}>
            <FlatList
              data={LANGUAGES}
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
    </TouchableWithoutFeedback>
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
