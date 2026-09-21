import { useEffect, useState } from "react";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { screenWidth } from "@/components/game/shared/game.styles";

import { createPlayerNames } from "@/utils";

import { GameRoundDispatch, RoundState } from "./types";

export const useStartGame = (
  dispatch: GameRoundDispatch,
  gameMode: string | undefined,
  state: RoundState,
) => {
  useEffect(() => {
    if (!gameMode) return;

    const hasActiveRound =
      state.gameMode === gameMode &&
      (state.cards.length > 0 ||
        state.centerDeck.length > 0 ||
        state.playerStacks.length > 0 ||
        state.gameOver);
    if (hasActiveRound) return;

    dispatch({ type: "SET_GAME_MODE", payload: gameMode });
    dispatch({
      type: "SET_PLAYERS",
      payload: createPlayerNames(
        gameMode === "duel" ? 2 : state.numPlayers || 2,
      ),
    });
    dispatch({ type: "START_GAME" });
  }, [
    dispatch,
    gameMode,
    state.cards.length,
    state.centerDeck.length,
    state.gameMode,
    state.gameOver,
    state.numPlayers,
    state.playerStacks.length,
  ]);
};

export const useDealAnimation = (state: RoundState) => {
  const dealProgress = useSharedValue(1);

  useEffect(() => {
    if (!state.cards.length && !state.centerDeck.length) return;

    dealProgress.value = 0;
    dealProgress.value = withTiming(1, {
      duration: 420,
      easing: Easing.out(Easing.cubic),
    });
  }, [dealProgress, state.cards, state.centerDeck]);

  return useAnimatedStyle(() => ({
    opacity: dealProgress.value,
    transform: [
      { translateX: (1 - dealProgress.value) * screenWidth * 0.32 },
      { scale: 0.94 + dealProgress.value * 0.06 },
    ],
  }));
};

export const useMemoryPreview = (memoryMode: boolean, state: RoundState) => {
  const [memorySeconds, setMemorySeconds] = useState(30);
  const [memoryVisible, setMemoryVisible] = useState(false);

  useEffect(() => {
    if (!memoryMode || !state.memoryCards.length) {
      setMemoryVisible(false);
      return;
    }

    setMemoryVisible(true);
    setMemorySeconds(30);
    const interval = setInterval(() => {
      setMemorySeconds((seconds) => {
        if (seconds <= 1) {
          clearInterval(interval);
          setMemoryVisible(false);
          return 0;
        }

        return seconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [memoryMode, state.memoryCards]);

  return { memorySeconds, memoryVisible, setMemoryVisible };
};
