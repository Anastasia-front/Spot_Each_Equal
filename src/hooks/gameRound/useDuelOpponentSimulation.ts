import { useEffect, useRef } from "react";
import { withSpring } from "react-native-reanimated";

import { findCommonSymbol } from "@/utils";

import { RemoteSimulationArgs } from "./remoteSimulation.types";

export const useDuelOpponentSimulation = ({
  clearSelection,
  dispatch,
  matchScale,
  selectedSymbolsLength,
  setMatchedSymbol,
  setMatchMessage,
  setShowMatch,
  state,
  duelMode,
}: Omit<RemoteSimulationArgs, "animateCenterCardToReceiver"> & {
  duelMode: boolean;
}) => {
  const duelOpponentTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    if (duelOpponentTimeout.current) {
      clearTimeout(duelOpponentTimeout.current);
      duelOpponentTimeout.current = null;
    }

    if (
      !duelMode ||
      state.gamePaused ||
      state.gameOver ||
      selectedSymbolsLength > 0
    ) {
      return;
    }

    const localCard = state.playerStacks[0]?.[state.playerStacks[0].length - 1];
    const opponentCard =
      state.playerStacks[1]?.[state.playerStacks[1].length - 1];
    if (!localCard || !opponentCard) return;

    duelOpponentTimeout.current = setTimeout(() => {
      const opponentName = state.players[1] ?? "Opponent";
      const symbol = findCommonSymbol([
        localCard.symbols,
        opponentCard.symbols,
      ]);

      setMatchedSymbol(symbol);
      setMatchMessage(`${opponentName} captured your card`);
      setShowMatch(true);
      matchScale.value = withSpring(1);

      setTimeout(() => {
        dispatch({
          type: "MATCH_FOUND",
          payload: {
            cards: [],
            playerIndex: 1,
            selectedCardIds: [localCard.id, opponentCard.id],
            symbol: symbol ?? "",
          },
        });
        clearSelection();
        dispatch({ type: "CLEAR_MATCH" });
      }, 900);
    }, 7200);

    return () => {
      if (duelOpponentTimeout.current) {
        clearTimeout(duelOpponentTimeout.current);
        duelOpponentTimeout.current = null;
      }
    };
  }, [
    clearSelection,
    dispatch,
    duelMode,
    matchScale,
    selectedSymbolsLength,
    setMatchedSymbol,
    setMatchMessage,
    setShowMatch,
    state.gameOver,
    state.gamePaused,
    state.playerStacks,
    state.players,
  ]);
};
