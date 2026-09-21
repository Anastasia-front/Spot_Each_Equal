import { useCallback, useState } from "react";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import {
  gameCanvasHeight,
  screenWidth,
} from "@/components/game/shared/game.styles";
import { SelectedSymbol } from "@/components/game/shared/types";

import { RoundState } from "./types";

export const useRoundAnimationState = ({
  gameMode,
  setMatchedSymbol,
  setMatchMessage,
  setSelectedSymbols,
  setShowMatch,
  state,
}: {
  gameMode?: string;
  setMatchedSymbol: (symbol: string | null) => void;
  setMatchMessage: (message: string | null) => void;
  setSelectedSymbols: React.Dispatch<React.SetStateAction<SelectedSymbol[]>>;
  setShowMatch: (show: boolean) => void;
  state: RoundState;
}) => {
  const [collectingCard, setCollectingCard] = useState<any | null>(null);
  const [collectingReceiverIndex, setCollectingReceiverIndex] = useState<
    number | null
  >(null);
  const collectProgress = useSharedValue(0);
  const matchScale = useSharedValue(0);

  const clearSelection = useCallback(() => {
    setSelectedSymbols([]);
    setShowMatch(false);
    setMatchedSymbol(null);
    setMatchMessage(null);
    setCollectingCard(null);
    setCollectingReceiverIndex(null);
    matchScale.value = 0;
  }, [
    matchScale,
    setMatchedSymbol,
    setMatchMessage,
    setSelectedSymbols,
    setShowMatch,
  ]);

  const animateCenterCardToReceiver = useCallback(
    (receiverIndex: number, onComplete: () => void) => {
      setCollectingCard(state.centerDeck[0] ?? null);
      setCollectingReceiverIndex(receiverIndex);
      collectProgress.value = 0;
      collectProgress.value = withTiming(1, {
        duration: 620,
        easing: Easing.inOut(Easing.cubic),
      });

      setTimeout(() => {
        onComplete();
        setCollectingCard(null);
        setCollectingReceiverIndex(null);
      }, 620);
    },
    [collectProgress, state.centerDeck],
  );

  const collectAnimatedStyle = useAnimatedStyle(() => {
    const receiverIndex = collectingReceiverIndex ?? 0;
    const isYouMode = gameMode === "you";
    const targetX = isYouMode
      ? receiverIndex === 0
        ? screenWidth * 0.22
        : (receiverIndex - 2) * screenWidth * 0.22
      : receiverIndex === 0
        ? 0
        : screenWidth * 0.26;
    const targetY = isYouMode
      ? receiverIndex === 0
        ? 0
        : gameCanvasHeight * 0.28
      : receiverIndex === 0
        ? gameCanvasHeight * 0.28
        : -gameCanvasHeight * 0.28 + receiverIndex * 48;

    return {
      opacity: 1 - collectProgress.value,
      transform: [
        { translateX: targetX * collectProgress.value },
        { translateY: targetY * collectProgress.value },
        { scale: 1 - collectProgress.value * 0.42 },
      ],
    };
  });

  const matchAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: matchScale.value }],
    opacity: matchScale.value,
  }));

  return {
    animateCenterCardToReceiver,
    clearSelection,
    collectAnimatedStyle,
    collectingCard,
    collectingReceiverIndex,
    matchAnimatedStyle,
    matchScale,
  };
};
