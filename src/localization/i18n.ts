import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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
        me: "A mode where all cards with matching items you find are taken by you. The winner is the one with the most points.",
        you: "Challenge other players in timed rounds. When you find a match on a card with an opponent, the card is given to them. The winner is the one with the fewest points.",
        memo: "Test your memory. With one card in hand, remember all its items and find matching ones on new cards from the deck. The winner is the one with the most points.",
        reset:
          "Restart and shuffle the cards. In the discard pile, all cards are face up, and you must quickly find pairs on any cards. The winner is the one with the most points.",
        duel: "Play against a single opponent.",
        smallPile: "Play with fewer cards for quicker rounds.",
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
        me: "Un mode où toutes les cartes avec des éléments identiques que vous trouvez sont prises par vous. Le gagnant est celui avec le plus de points.",
        you: "Défiez d'autres joueurs dans des manches chronométrées. Lorsque vous trouvez une correspondance sur une carte avec un adversaire, la carte lui est donnée. Le gagnant est celui avec le moins de points.",
        memo: "Testez votre mémoire. Avec une carte en main, mémorisez tous ses éléments et trouvez-en les correspondants sur de nouvelles cartes du paquet. Le gagnant est celui avec le plus de points.",
        reset:
          "Redémarrez et mélangez les cartes. Dans la pile de défausse, toutes les cartes sont face visible et vous devez rapidement trouver des paires sur n'importe quelles cartes. Le gagnant est celui avec le plus de points.",
        duel: "Affrontez un seul adversaire.",
        smallPile: "Jouez avec moins de cartes pour des manches plus rapides.",
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
  ua: {
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
        me: "Режим гри, зосереджений на тому що всі карти, на яких тобою було знайдено схожі предмети, ти забираєш собі. Переможець той, у кого більше балів.",
        you: "Кидай виклик іншим гравцям у раундах на час. Коли знаходиш спільний предмет на картці із суперником, карта зараховується йому. Переможець той, у кого менше балів.",
        memo: "Перевір свої навички пам’яті. Треба, маючи одну карту, запамʼятати всі предмети на ній та знаходити схожі предмети на нових картах з колоди. Переможець той, у кого більше балів.",
        reset:
          "Перезапусти та перетасуй карти. У зносі всі карти розкриті й треба якомога швидше знаходити пари на будь-яких картках. Переможець той, у кого більше балів.",
        duel: "Зіграйте проти одного суперника.",
        smallPile: "Грай з меншою кількістю карт для швидких раундів.",
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

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLocale, // 'en', 'fr', 'ua'
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
