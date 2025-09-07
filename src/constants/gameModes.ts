import {
  Brain,
  Clock,
  Grid3X3,
  RotateCcw,
  Swords,
  Users,
} from "lucide-react-native";

export type GameMode = {
  key: string;
  title: string;
  description: string;
  color: [string, string];
  players: string;
  icon: any;
};

export const getGameModes = (t: (key: string) => string): GameMode[] => [
  {
    key: "me",
    title: t("gameModes.me"),
    description: t("gameModeDescriptions.me"),
    color: ["#DDA0DD", "#e6b3b3ff"],
    players: "2-5",
    icon: Users,
  },
  {
    key: "you",
    title: t("gameModes.you"),
    description: t("gameModeDescriptions.you"),
    color: ["#4ECDC4", "#6ed589ff"],
    players: "2-6",
    icon: Clock,
  },
  {
    key: "memo",
    title: t("gameModes.memo"),
    description: t("gameModeDescriptions.memo"),
    color: ["#ffc38eff", "#ffd78eff"],
    players: "2-4",
    icon: Brain,
  },
  {
    key: "reset",
    title: t("gameModes.reset"),
    description: t("gameModeDescriptions.reset"),
    color: ["#b396ceff", "#fedfffff"],
    players: "2-6",
    icon: RotateCcw,
  },
  {
    key: "duel",
    title: t("gameModes.duel"),
    description: t("gameModeDescriptions.duel"),
    color: ["#5be5bcff", "#67d66bff"],
    players: "2",
    icon: Swords,
  },
  {
    key: "smallPile",
    title: t("gameModes.smallPile"),
    description: t("gameModeDescriptions.smallPile"),
    color: ["#6b75ffff", "#8eaaffff"],
    players: "2-8",
    icon: Grid3X3,
  },
];
