import { SelectedSymbol } from "@/components/game/shared/types";

import {
  GameModeFlags,
  GameRoundDispatch,
  MatchFeedbackControls,
  RoundState,
} from "./types";

export type SymbolPressArgs = MatchFeedbackControls &
  GameModeFlags & {
    animateCenterCardToReceiver: (
      receiverIndex: number,
      onComplete: () => void,
    ) => void;
    card: any;
    cardsToMatch: number;
    clearSelection: () => void;
    dispatch: GameRoundDispatch;
    gameMode?: string;
    selectedSymbols: SelectedSymbol[];
    setMemoryVisible: (visible: boolean) => void;
    setSelectedSymbols: React.Dispatch<React.SetStateAction<SelectedSymbol[]>>;
    state: RoundState;
    symbol: any;
    symbolIndex: number;
  };
