import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

globalThis.Intl ??= {} as typeof Intl;

require("@formatjs/intl-pluralrules/polyfill-force");
require("@formatjs/intl-pluralrules/locale-data/en");
require("@formatjs/intl-pluralrules/locale-data/fr");
require("@formatjs/intl-pluralrules/locale-data/uk");

const resources = {
  en: {
    translation: {
      buttons: {
        play: "Play",
        game: "Game",
        settings: "Settings",
        back: "Back",
        resume: "Resume",
        continue: "Continue",
      },
      instructions: {
        findSymbol:
          "Find the same symbol and click it on each of the {{count}} cards!",
      },
      symbolLabel: "Symbol",
      loading: "Loading game...",
      gamePaused: "Game Paused",
      foundMatch: "Found a match!",
      findMatchingSymbol: "Find the matching symbol between any two cards!",
      gameTitle: "Spot Each Equal",
      selectGameMode: "Select game mode",
      selectPlayers: "Select number of players",
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
        me: "Each player has one card, with the deck face up in the center. Find the shared symbol with the center card first, take that card, and score the most cards.",
        you: "Find a match between the center card and an opponent's card, then give the center card to that opponent. The player with the fewest cards wins.",
        memo: "Memorize the symbols on your card, then find matching symbols from memory as new cards appear. Correct answers score points.",
        reset:
          "All cards are dealt to players. Race to find the shared symbol with the central discard pile and get rid of your cards first.",
        duel: "Two players try to win every card from the opponent by spotting matches faster.",
        smallPile:
          "Scatter the cards on the table and race to collect matching pairs. Shadow and special-symbol cards can add extra challenges later.",
      },
      aboutTitle: "About",
      aboutDescription:
        "A fast-paced card matching game where every pair of cards shares exactly one identical symbol. Test your observation skills and reaction time in this beautifully designed mobile experience!",
      gameFeaturesTitle: "Game Features:",
      gameFeatures: {
        cards: "55 unique hexagonal cards",
        modes: "6 different game modes",
        multiplayer: "Multiplayer support",
        languages: "Multiple languages",
        animations: "Smooth animations",
      },
      version: "Version",
      language: "Language",
    },
  },
  fr: {
    translation: {
      buttons: {
        play: "Jouer",
        game: "Jeu",
        settings: "Paramètres",
        back: "Retour",
        resume: "Reprendre",
        continue: "Continuer",
      },
      instructions: {
        findSymbol:
          "Trouvez le même symbole et cliquez dessus sur chacune des {{count}} cartes !",
      },
      symbolLabel: "Symbole",
      loading: "Chargement du jeu...",
      gamePaused: "Jeu en pause",
      foundMatch: "Correspondance trouvée !",
      findMatchingSymbol: "Trouvez le symbole identique entre deux cartes !",
      gameTitle: "Repérer chaque égal",
      selectGameMode: "Sélectionner un mode de jeu",
      selectPlayers: "Sélectionnez le nombre de joueurs",
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
        me: "Chaque joueur a une carte et le paquet est visible au centre. Trouvez le symbole commun avec la carte centrale, prenez cette carte et marquez le plus de cartes.",
        you: "Trouvez une correspondance entre la carte centrale et la carte d'un adversaire, puis donnez-lui cette carte. Le joueur avec le moins de cartes gagne.",
        memo: "Mémorisez les symboles de votre carte, puis trouvez de mémoire les symboles communs sur les nouvelles cartes. Les bonnes réponses rapportent des points.",
        reset:
          "Toutes les cartes sont distribuées aux joueurs. Trouvez vite le symbole commun avec la défausse centrale pour vous débarrasser de vos cartes en premier.",
        duel: "Deux joueurs essaient de prendre toutes les cartes de l'adversaire en repérant les correspondances plus vite.",
        smallPile:
          "Éparpillez les cartes sur la table et récupérez les paires le plus vite possible. Les cartes ombres et symboles spéciaux pourront ajouter des défis.",
      },
      aboutTitle: "À propos",
      aboutDescription:
        "Un jeu de cartes rapide où chaque paire de cartes partage exactement un symbole identique. Testez vos compétences d'observation et votre temps de réaction dans cette expérience mobile magnifiquement conçue !",
      gameFeaturesTitle: "Caractéristiques du jeu :",
      gameFeatures: {
        cards: "55 cartes hexagonales uniques",
        modes: "6 modes de jeu différents",
        multiplayer: "Support multijoueur",
        languages: "Plusieurs langues",
        animations: "Animations fluides",
      },
      version: "Version",
      language: "Langue",
    },
  },
  uk: {
    translation: {
      buttons: {
        play: "Грати",
        game: "Гра",
        settings: "Налаштування",
        back: "Назад",
        resume: "Продовжити",
        continue: "Продовжити",
      },
      instructions: {
        findSymbol:
          "Знайдіть однаковий символ і натисніть на нього на кожній з {{count}} карт!",
      },
      symbolLabel: "Символ",
      loading: "Завантаження гри...",
      gamePaused: "Гру призупинено",
      foundMatch: "Знайдено пару!",
      findMatchingSymbol:
        "Знайди однаковий символ між будь-якими двома картками!",
      gameTitle: "Знайди однакові",
      selectGameMode: "Виберіть режим гри",
      selectPlayers: "Виберіть кількість гравців",
      players: "Гравці",
      gameModes: {
        me: "Мені",
        you: "Тобі",
        memo: "Пам’ять",
        reset: "Скинути",
        duel: "Дуель",
        smallPile: "Маленька колода",
      },
      gameModeDescriptions: {
        me: "Кожен гравець має одну карту, а колода лежить у центрі горілиць. Першим знайди спільний символ із центральною картою, забери її й набери найбільше карт.",
        you: "Знайди збіг між центральною картою та картою суперника, після чого віддай центральну карту йому. Перемагає той, у кого найменше карт.",
        memo: "Запамʼятай символи на своїй карті, а потім по памʼяті знаходь збіги на нових картах. Правильні відповіді дають бали.",
        reset:
          "Усі карти роздаються гравцям. Швидко знаходь спільний символ із центральним скидом і першим позбудься своїх карт.",
        duel: "Два гравці намагаються забрати всі карти суперника, швидше знаходячи збіги.",
        smallPile:
          "Карти розсипаються на столі, а гравці наввипередки збирають пари. Карти-тіні та спеціальні символи можна додати як ускладнення.",
      },
      aboutTitle: "Про гру",
      aboutDescription:
        "Динамічна гра на швидкість та уважність, де кожна пара карток має лише один спільний символ. Перевір свої навички спостереження та швидкість реакції в цій красиво оформленій мобільній грі!",
      gameFeaturesTitle: "Особливості гри:",
      gameFeatures: {
        cards: "55 унікальних шестикутних карток",
        modes: "6 різних режимів гри",
        multiplayer: "Підтримка мультиплеєра",
        languages: "Кілька мов",
        animations: "Плавні анімації",
      },
      version: "Версія",
      language: "Мова",
    },
  },
};

const deviceLocale = Localization.getLocales()[0]?.languageCode || "en";
const supportedLocale = ["en", "fr", "uk"].includes(deviceLocale)
  ? deviceLocale
  : "en";

i18n.use(initReactI18next).init({
  resources,
  lng: supportedLocale,
  fallbackLng: "en",
  supportedLngs: ["en", "fr", "uk"],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
