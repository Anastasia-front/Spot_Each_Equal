import { useEffect, useRef } from "react";
import { withSpring } from "react-native-reanimated";

import { findCommonSymbol } from "@/utils";

import { RemoteSimulationArgs } from "./remoteSimulation.types";

export const useStackRemoteSimulation = ({
  animateCenterCardToReceiver,
  clearSelection,
  dispatch,
  matchScale,
  selectedSymbolsLength,
  setMatchedSymbol,
  setMatchMessage,
  setShowMatch,
  state,
  gameMode,
  stackMode,
}: RemoteSimulationArgs & {
  gameMode?: string;
  stackMode: boolean;
}) => {
  const remoteMatchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remoteDealTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clearRemoteTimers = () => {
      if (remoteMatchTimeout.current) {
        clearTimeout(remoteMatchTimeout.current);
        remoteMatchTimeout.current = null;
      }
      if (remoteDealTimeout.current) {
        clearTimeout(remoteDealTimeout.current);
        remoteDealTimeout.current = null;
      }
    };

    clearRemoteTimers();

    if (
      !stackMode ||
      state.numPlayers < 2 ||
      state.gamePaused ||
      state.gameOver ||
      selectedSymbolsLength > 0
    ) {
      return clearRemoteTimers;
    }

    const centerCard = state.centerDeck[0];
    const opponentIndex = 1;
    const receiverIndex = gameMode === "you" ? 0 : opponentIndex;
    const comparedStack = state.playerStacks[receiverIndex];
    const comparedCard = comparedStack?.[comparedStack.length - 1];
    if (!centerCard || !comparedCard) return clearRemoteTimers;

    const opponentName = state.players[opponentIndex] ?? "George";

    remoteMatchTimeout.current = setTimeout(() => {
      const symbol = findCommonSymbol([
        centerCard.symbols,
        comparedCard.symbols,
      ]);
      setMatchedSymbol(symbol);
      setMatchMessage(`${opponentName} found a match`);
      setShowMatch(true);
      matchScale.value = withSpring(1);

      remoteDealTimeout.current = setTimeout(() => {
        animateCenterCardToReceiver(receiverIndex, () => {
          dispatch({
            type: "MATCH_FOUND",
            payload: {
              cards: [],
              receiverIndex,
              selectedCardIds: [centerCard.id, comparedCard.id],
              symbol: symbol ?? "",
            },
          });
          clearSelection();
          dispatch({ type: "CLEAR_MATCH" });
        });
      }, 1000);
    }, 7000);

    return clearRemoteTimers;
  }, [
    animateCenterCardToReceiver,
    clearSelection,
    dispatch,
    gameMode,
    matchScale,
    selectedSymbolsLength,
    setMatchedSymbol,
    setMatchMessage,
    setShowMatch,
    stackMode,
    state.centerDeck,
    state.gameOver,
    state.gamePaused,
    state.numPlayers,
    state.playerStacks,
    state.players,
  ]);
};
