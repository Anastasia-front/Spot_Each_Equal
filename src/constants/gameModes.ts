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
    color: ["#DDA0DD", "#E6B3E6"],
    players: "2-5",
    icon: Users,
  },
  {
    key: "you",
    title: t("gameModes.you"),
    description: t("gameModeDescriptions.you"),
    color: ["#4ECDC4", "#6ED5D0"],
    players: "2-6",
    icon: Clock,
  },
  {
    key: "memo",
    title: t("gameModes.memo"),
    description: t("gameModeDescriptions.memo"),
    color: ["#FFEAA7", "#FFECB3"],
    players: "2-4",
    icon: Brain,
  },
  {
    key: "reset",
    title: t("gameModes.reset"),
    description: t("gameModeDescriptions.reset"),
    color: ["#96CEB4", "#A8D4C0"],
    players: "2-6",
    icon: RotateCcw,
  },
  {
    key: "duel",
    title: t("gameModes.duel"),
    description: t("gameModeDescriptions.duel"),
    color: ["#45B7D1", "#67C3D6"],
    players: "2",
    icon: Swords,
  },
  {
    key: "smallPile",
    title: t("gameModes.smallPile"),
    description: t("gameModeDescriptions.smallPile"),
    color: ["#FF6B6B", "#FF8E8E"],
    players: "2-8",
    icon: Grid3X3,
  },
];
