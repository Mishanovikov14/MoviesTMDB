import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, uk } from "./translations";

const resources = {
  "en-US": {
    translation: en,
  },

  uk: {
    translation: uk,
  },
};

i18next.use(initReactI18next).init({
  lng: "en-US",
  fallbackLng: "en-US",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  resources,
  compatibilityJSON: "v4",
});

export default i18next;
