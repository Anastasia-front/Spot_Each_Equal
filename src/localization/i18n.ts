import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      buttons: {
        play: "Play",
        settings: "Settings",
        back: "Back",
        resume: "Resume",
      },
      foundMatch: "Found a match!",
      gameTitle: "Spot Each Equal",
      selectGameMode: "Select game mode",
      players: "Players",
      gameModes: {
        me: "Me",
        you: "You",
        memo: "Memory",
        reset: "Reset",
        duel: "Duel",
        smallPile: "Small pile",
      },
      gameModeDescriptions: {
        me: "A game mode focused on personal play.",
        you: "Challenge other players in timed rounds.",
        memo: "Test your memory skills.",
        reset: "Restart and shuffle the cards.",
        duel: "Face off against a single opponent.",
        smallPile: "Play with fewer cards for quick rounds.",
      },
    },
  },
  fr: {
    translation: {
      buttons: {
        play: "Jouer",
        settings: "Paramètres",
        back: "Retour",
        resume: "Reprendre",
      },
      foundMatch: "Correspondance trouvée !",
      gameTitle: "Repérer chaque égal",
      selectGameMode: "Sélectionner un mode de jeu",
      players: "Joueurs",
      gameModes: {
        me: "Moi",
        you: "Toi",
        memo: "Mémoire",
        reset: "Réinitialiser",
        duel: "Duel",
        smallPile: "Petit tas",
      },
      gameModeDescriptions: {
        me: "Un mode de jeu axé sur le jeu personnel.",
        you: "Défiez d'autres joueurs en manches chronométrées.",
        memo: "Testez vos compétences en mémoire.",
        reset: "Redémarrer et mélanger les cartes.",
        duel: "Affrontez un seul adversaire.",
        smallPile: "Jouez avec moins de cartes pour des manches rapides.",
      },
    },
  },
  ua: {
    translation: {
      buttons: {
        play: "Грати",
        settings: "Налаштування",
        back: "Назад",
        resume: "Продовжити",
      },
      foundMatch: "Знайдено пару!",
      gameTitle: "Знайди однакові",
      selectGameMode: "Виберіть режим гри",
      players: "Гравці",
      gameModes: {
        me: "Я",
        you: "Ти",
        memo: "Пам’ять",
        reset: "Скинути",
        duel: "Дуель",
        smallPile: "Маленька колода",
      },
      gameModeDescriptions: {
        me: "Режим гри, зосереджений на особистій грі.",
        you: "Кидай виклик іншим гравцям у раундах на час.",
        memo: "Перевір свої навички пам’яті.",
        reset: "Перезапусти та перетасуй карти.",
        duel: "Зіграйте проти одного суперника.",
        smallPile: "Грай з меншою кількістю карт для швидких раундів.",
      },
    },
  },
};

const deviceLocale = Localization.getLocales()[0]?.languageCode || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLocale, // 'en', 'fr', 'ua'
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
