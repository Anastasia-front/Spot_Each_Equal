import { useCallback, useEffect, useRef } from "react";

import { SelectedSymbol } from "@/components/game/shared/types";

import { handleRoundSymbolPress } from "./symbolPressHandlers";
import {
  GameModeFlags,
  GameRoundDispatch,
  MatchFeedbackControls,
  RoundState,
} from "./types";

export const useRoundSymbolPress = ({
  animateCenterCardToReceiver,
  cardsToMatch,
  clearSelection,
  dispatch,
  feedbackControls,
  flags,
  gameMode,
  selectedSymbols,
  setMemoryVisible,
  setSelectedSymbols,
  state,
}: {
  animateCenterCardToReceiver: (
    receiverIndex: number,
    onComplete: () => void,
  ) => void;
  cardsToMatch: number;
  clearSelection: () => void;
  dispatch: GameRoundDispatch;
  feedbackControls: MatchFeedbackControls;
  flags: GameModeFlags;
  gameMode?: string;
  selectedSymbols: SelectedSymbol[];
  setMemoryVisible: (visible: boolean) => void;
  setSelectedSymbols: React.Dispatch<React.SetStateAction<SelectedSymbol[]>>;
  state: RoundState;
}) => {
  const latestValuesRef = useRef({
    feedbackControls,
    flags,
    selectedSymbols,
    state,
  });

  useEffect(() => {
    latestValuesRef.current = {
      feedbackControls,
      flags,
      selectedSymbols,
      state,
    };
  }, [feedbackControls, flags, selectedSymbols, state]);

  return useCallback(
    (card: any, symbol: any, symbolIndex: number) => {
      const { feedbackControls, flags, selectedSymbols, state } =
        latestValuesRef.current;

      handleRoundSymbolPress({
        ...feedbackControls,
        ...flags,
        animateCenterCardToReceiver,
        card,
        cardsToMatch,
        clearSelection,
        dispatch,
        gameMode,
        selectedSymbols,
        setMemoryVisible,
        setSelectedSymbols,
        state,
        symbol,
        symbolIndex,
      });
    },
    [
      animateCenterCardToReceiver,
      cardsToMatch,
      clearSelection,
      dispatch,
      gameMode,
      setMemoryVisible,
      setSelectedSymbols,
    ],
  );
};
