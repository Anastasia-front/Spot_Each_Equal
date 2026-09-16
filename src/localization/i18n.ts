import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "./resources/en";
import { fr } from "./resources/fr";
import { uk } from "./resources/uk";

globalThis.Intl ??= {} as typeof Intl;

require("@formatjs/intl-pluralrules/polyfill-force");
require("@formatjs/intl-pluralrules/locale-data/en");
require("@formatjs/intl-pluralrules/locale-data/fr");
require("@formatjs/intl-pluralrules/locale-data/uk");

const resources = { en, fr, uk };
const supportedLngs = ["en", "fr", "uk"];

const deviceLocale = Localization.getLocales()[0]?.languageCode || "en";
const supportedLocale = supportedLngs.includes(deviceLocale)
  ? deviceLocale
  : "en";

i18n.use(initReactI18next).init({
  resources,
  lng: supportedLocale,
  fallbackLng: "en",
  supportedLngs,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
