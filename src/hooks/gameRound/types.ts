import { SharedValue } from "react-native-reanimated";

import { GameState } from "@/context/gameTypes";

export type GameRoundDispatch = React.Dispatch<any>;

export type GameModeFlags = {
  duelMode: boolean;
  memoryMode: boolean;
  resetMode: boolean;
  smallPileMode: boolean;
  stackMode: boolean;
};

export type MatchFeedbackControls = {
  matchScale: SharedValue<number>;
  setMatchedSymbol: (symbol: string | null) => void;
  setMatchMessage: (message: string | null) => void;
  setShowMatch: (show: boolean) => void;
};

export type RoundState = GameState;
