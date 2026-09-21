import { useCallback, useMemo, useState } from "react";

import {
  gameCanvasHeight,
  screenWidth,
} from "@/components/game/shared/game.styles";
import { clamp, vh, vw } from "@/components/game/shared/responsive";
import { SelectedSymbol } from "@/components/game/shared/types";
import { createPlayerNames, getCardSize } from "@/utils";

import {
  useDealAnimation,
  useMemoryPreview,
  useModeSimulations,
  useRoundAnimationState,
  useRoundSymbolPress,
  useStartGame,
} from "./gameRound";

export const useGameRound = ({
  dispatch,
  gameMode,
  state,
}: {
  dispatch: React.Dispatch<any>;
  gameMode?: string;
  state: any;
}) => {
  const [selectedSymbols, setSelectedSymbols] = useState<SelectedSymbol[]>([]);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedSymbol, setMatchedSymbol] = useState<string | null>(null);
  const [matchMessage, setMatchMessage] = useState<string | null>(null);

  const cardsToMatch = state.cardsToMatch || 2;
  const flags = useMemo(
    () => ({
      duelMode: gameMode === "duel",
      memoryMode: gameMode === "memo",
      resetMode: gameMode === "reset",
      smallPileMode: gameMode === "smallPile",
      stackMode: gameMode === "me" || gameMode === "you",
    }),
    [gameMode],
  );

  useStartGame(dispatch, gameMode, state);
  const dealtCardAnimatedStyle = useDealAnimation(state);
  const { memorySeconds, memoryVisible, setMemoryVisible } = useMemoryPreview(
    flags.memoryMode,
    state,
  );
  const {
    animateCenterCardToReceiver,
    clearSelection,
    collectAnimatedStyle,
    collectingCard,
    collectingReceiverIndex,
    matchAnimatedStyle,
    matchScale,
  } = useRoundAnimationState({
    gameMode,
    setMatchedSymbol,
    setMatchMessage,
    setSelectedSymbols,
    setShowMatch,
    state,
  });

  const feedbackControls = useMemo(
    () => ({
      matchScale,
      setMatchedSymbol,
      setMatchMessage,
      setShowMatch,
    }),
    [matchScale],
  );

  useModeSimulations({
    animateCenterCardToReceiver,
    clearSelection,
    dispatch,
    feedbackControls,
    flags,
    gameMode,
    selectedSymbolsLength: selectedSymbols.length,
    state,
  });

  const handleSymbolPress = useRoundSymbolPress({
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
  });

  const handleNewGame = useCallback(() => {
    dispatch({ type: "RESET_GAME" });
    if (gameMode) {
      dispatch({ type: "SET_GAME_MODE", payload: gameMode });
      dispatch({
        type: "SET_PLAYERS",
        payload: createPlayerNames(state.numPlayers || 2),
      });
      dispatch({ type: "START_GAME" });
    }
    clearSelection();
  }, [clearSelection, dispatch, gameMode, state.numPlayers]);

  const cardSize =
    cardsToMatch === 2
      ? clamp(Math.min(vw(82), gameCanvasHeight / 2 - vh(3.2)), vw(52), vh(34))
      : getCardSize(cardsToMatch, screenWidth);

  return {
    cardSize,
    cardsToMatch,
    collectAnimatedStyle,
    collectingCard,
    collectingReceiverIndex,
    dealtCardAnimatedStyle,
    handleNewGame,
    handleSymbolPress,
    matchedSymbol,
    memorySeconds,
    memoryVisible,
    matchMessage,
    matchAnimatedStyle,
    selectedSymbols,
    showMatch,
  };
};
