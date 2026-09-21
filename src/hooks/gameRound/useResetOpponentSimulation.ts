import { useEffect, useRef } from "react";
import { withSpring } from "react-native-reanimated";

import { findCommonSymbol } from "@/utils";

import { RemoteSimulationArgs } from "./remoteSimulation.types";

export const useResetOpponentSimulation = ({
  clearSelection,
  dispatch,
  matchScale,
  selectedSymbolsLength,
  setMatchedSymbol,
  setMatchMessage,
  setShowMatch,
  state,
  resetMode,
}: Omit<RemoteSimulationArgs, "animateCenterCardToReceiver"> & {
  resetMode: boolean;
}) => {
  const resetOpponentTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    if (resetOpponentTimeout.current) {
      clearTimeout(resetOpponentTimeout.current);
      resetOpponentTimeout.current = null;
    }

    if (
      !resetMode ||
      state.gamePaused ||
      state.gameOver ||
      selectedSymbolsLength > 0
    ) {
      return;
    }

    const opponentIndex = state.playerStacks.findIndex(
      (stack: any[], index: number) => index > 0 && stack.length > 0,
    );
    if (opponentIndex < 0) return;

    resetOpponentTimeout.current = setTimeout(() => {
      const opponentName = state.players[opponentIndex] ?? "Opponent";
      const opponentCard =
        state.playerStacks[opponentIndex]?.[
          state.playerStacks[opponentIndex].length - 1
        ];
      const centerCard = state.centerDeck[0];
      const symbol =
        opponentCard && centerCard
          ? findCommonSymbol([opponentCard.symbols, centerCard.symbols])
          : null;

      setMatchedSymbol(symbol);
      setMatchMessage(`${opponentName} discarded a card`);
      setShowMatch(true);
      matchScale.value = withSpring(1);

      setTimeout(() => {
        dispatch({
          type: "MATCH_FOUND",
          payload: {
            cards: [],
            playerIndex: opponentIndex,
            selectedCardIds:
              opponentCard && centerCard
                ? [opponentCard.id, centerCard.id]
                : [],
            symbol: symbol ?? "",
          },
        });
        clearSelection();
        dispatch({ type: "CLEAR_MATCH" });
      }, 900);
    }, 6500);

    return () => {
      if (resetOpponentTimeout.current) {
        clearTimeout(resetOpponentTimeout.current);
        resetOpponentTimeout.current = null;
      }
    };
  }, [
    clearSelection,
    dispatch,
    matchScale,
    resetMode,
    selectedSymbolsLength,
    setMatchedSymbol,
    setMatchMessage,
    setShowMatch,
    state.centerDeck,
    state.gameOver,
    state.gamePaused,
    state.playerStacks,
    state.players,
  ]);
};
