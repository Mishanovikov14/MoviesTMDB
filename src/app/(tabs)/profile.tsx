import Button from "@/src/components/ui/Button";
import ButtonWithIcon from "@/src/components/ui/ButtonWithIcon";
import * as ImagePicker from "expo-image-picker";
import TextWithTitleHorizontal from "@/src/components/ui/TextWithTitleHorizontal";
import { Colors } from "@/src/constants/Colors";
import { FIREBASE_AUTH } from "@/src/lib/FirebaseConfig";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Tabs } from "expo-router";
import { Image, StyleSheet, View, Text } from "react-native";
import { setUser } from "@/src/store/auth/authSlice";
import { showModal } from "@/src/store/modal/modalSlice";
import { addProfilePhoto } from "@/src/api/user";
import { useState } from "react";
import Loader from "@/src/components/ui/Loader";
import { MainStyles } from "@/src/constants/Style";
import ErrorBlock from "@/src/components/ui/ErrorBlock";
import { selectProfileLanguage, setProfileLanguage } from "@/src/store/profile/profileSlice";
import { useTranslation } from "react-i18next";
import Dropdown from "@/src/components/ui/Dropdown";

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const profileData = useAppSelector((state) => state.auth.user);
  const appLanguage = useAppSelector(selectProfileLanguage);
  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation();

  const handleSignOut = async () => {
    FIREBASE_AUTH.signOut();
    await AsyncStorage.setItem("isSignedIn", "false");
    router.replace("/");
  };

  const handleLanguageChange = async (language: string) => {
    try {
      i18n.changeLanguage(language);

      dispatch(setProfileLanguage({ language: language }));

      await AsyncStorage.setItem("appLanguage", language);
    } catch (error) {
      dispatch(
        showModal({
          title: t("defaultErrorTitle"),
          message: t("changeLanguageError"),
          borderColor: Colors.ERROR,
        })
      );
    }
  };

  const handlePickAndUploadImage = async () => {
    try {
      // Open image Picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.canceled || !result.assets?.length) {
        return;
      }

      setIsLoading(true);

      const imageUri = result.assets[0].uri;

      const userInfo = await addProfilePhoto(imageUri);

      dispatch(setUser(userInfo));
    } catch (error) {
      dispatch(
        showModal({
          title: t("failedToUploadProfilePhoto"),
          message: JSON.stringify(error),
          borderColor: Colors.ERROR,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (profileData === null) {
    return (
      <>
        <Tabs.Screen options={{ title: "" }} />
        <ErrorBlock text={t("profileDetailsFetchError")} />
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Tabs.Screen options={{ title: profileData.displayName!, tabBarLabel: t("profile") }} />
      <View>
        <View style={styles.imageContainer}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Image
                source={
                  profileData.photoURL
                    ? { uri: profileData.photoURL }
                    : require("../../../assets/images/avatar.png")
                }
                style={styles.image}
              />
              <ButtonWithIcon
                onPress={handlePickAndUploadImage}
                iconName="add"
                style={styles.editButton}
              />
            </>
          )}
        </View>
        <Text style={styles.titleText}>{t("profileInfo")}</Text>
        <TextWithTitleHorizontal title={`${t("fullname")}:`} text={profileData.displayName!} />
        <TextWithTitleHorizontal title={`${t("email")}:`} text={profileData.email!} />
        {/* <TextWithTitleHorizontal title={`${t("appLanguage")}:`} text={appLanguage} /> */}

        <Dropdown onSelect={(lang) => handleLanguageChange(lang)} />
      </View>

      {/* <Button onPress={handleLanguageChange} style={styles.button}>
        Change Language
      </Button> */}

      <Button onPress={handleSignOut} style={styles.button}>
        {t("signOut")}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: Colors.DARK,
    justifyContent: "space-between",
  },

  imageContainer: {
    minWidth: 170,
    minHeight: 170,
    marginBottom: 34,
    alignSelf: "center",
  },

  image: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderColor: Colors.LIGHT_GREY,
  },

  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },

  button: {
    marginVertical: 24,
  },

  titleText: {
    fontSize: MainStyles.FONTSIZE,
    textAlign: "center",
    color: Colors.PRIMARY,
    fontWeight: "bold",
    marginBottom: 12,
  },

  languagePicker: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
});
