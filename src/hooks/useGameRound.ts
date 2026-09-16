import { useEffect, useState } from "react";
import { Platform } from "react-native";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import {
  gameCanvasHeight,
  screenWidth,
} from "@/components/game/game.styles";
import { SelectedSymbol } from "@/components/game/types";
import { getCardSize } from "@/utils";

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

  const cardsToMatch = state.cardsToMatch || 2;
  const dealProgress = useSharedValue(1);
  const matchScale = useSharedValue(0);

  useEffect(() => {
    if (!gameMode) return;

    dispatch({ type: "SET_GAME_MODE", payload: gameMode });
    dispatch({ type: "SET_PLAYERS", payload: ["Player 1", "Player 2"] });
    dispatch({ type: "START_GAME" });
  }, [dispatch, gameMode]);

  useEffect(() => {
    if (!state.cards.length) return;

    dealProgress.value = 0;
    dealProgress.value = withTiming(1, {
      duration: 420,
      easing: Easing.out(Easing.cubic),
    });
  }, [dealProgress, state.cards]);

  const clearSelection = () => {
    setSelectedSymbols([]);
    setShowMatch(false);
    setMatchedSymbol(null);
    matchScale.value = 0;
  };

  const handleSymbolPress = (card: any, symbol: any, symbolIndex: number) => {
    if (state.gamePaused || state.gameOver) return;
    if (selectedSymbols.some((selected) => selected.status !== "selected")) {
      return;
    }

    if (Platform.OS !== "web") console.log("Haptic feedback triggered");

    const current: SelectedSymbol = {
      cardId: card.id,
      symbolIndex,
      icon: symbol.icon,
      status: "selected",
    };
    const previous = selectedSymbols[0];

    if (!previous || previous.cardId === card.id) {
      setSelectedSymbols([current]);
      return;
    }

    const status = previous.icon === symbol.icon ? "success" : "error";
    setSelectedSymbols([{ ...previous, status }, { ...current, status }]);

    if (status === "error") {
      setTimeout(() => setSelectedSymbols([]), 1000);
      return;
    }

    setMatchedSymbol(symbol.icon);
    setShowMatch(true);
    matchScale.value = withSpring(1);

    setTimeout(() => {
      dispatch({
        type: "MATCH_FOUND",
        payload: { cards: state.cards.slice(0, cardsToMatch), symbol: symbol.icon },
      });
      clearSelection();
      dispatch({ type: "CLEAR_MATCH" });
    }, 1000);
  };

  const handleNewGame = () => {
    dispatch({ type: "RESET_GAME" });
    if (gameMode) {
      dispatch({ type: "SET_GAME_MODE", payload: gameMode });
      dispatch({ type: "SET_PLAYERS", payload: ["Player 1", "Player 2"] });
      dispatch({ type: "START_GAME" });
    }
    clearSelection();
  };

  const cardSize =
    cardsToMatch === 2
      ? Math.min(screenWidth * 0.82, gameCanvasHeight / 2 - 22)
      : getCardSize(cardsToMatch, screenWidth);

  return {
    cardSize,
    cardsToMatch,
    dealtCardAnimatedStyle: useAnimatedStyle(() => ({
      opacity: dealProgress.value,
      transform: [
        { translateX: (1 - dealProgress.value) * screenWidth * 0.32 },
        { scale: 0.94 + dealProgress.value * 0.06 },
      ],
    })),
    handleNewGame,
    handleSymbolPress,
    matchedSymbol,
    matchAnimatedStyle: useAnimatedStyle(() => ({
      transform: [{ scale: matchScale.value }],
      opacity: matchScale.value,
    })),
    selectedSymbols,
    showMatch,
  };
};
