import { withSpring } from "react-native-reanimated";

import { SelectedSymbol } from "@/components/game/shared/types";
import { getMemoryMatchSymbolIndex } from "@/utils";

import { SymbolPressArgs } from "./symbolPressHandlers.types";

export const handleMemorySymbolPress = ({
  clearSelection,
  current,
  dispatch,
  matchScale,
  setMatchedSymbol,
  setMatchMessage,
  setMemoryVisible,
  setSelectedSymbols,
  setShowMatch,
  state,
  symbol,
}: SymbolPressArgs & { current: SelectedSymbol }) => {
  const centerCard = state.centerDeck[0];
  const memoryCard = state.memoryCards[0];
  if (!centerCard || !memoryCard || current.cardId !== centerCard.id) return;

  const memorySymbolIndex = getMemoryMatchSymbolIndex(memoryCard, symbol.icon);

  if (memorySymbolIndex < 0) {
    setSelectedSymbols([{ ...current, status: "error" }]);
    setTimeout(() => setSelectedSymbols([]), 1000);
    return;
  }

  setSelectedSymbols([
    { ...current, status: "success" },
    {
      cardId: memoryCard.id,
      icon: symbol.icon,
      status: "success",
      symbolIndex: memorySymbolIndex,
    },
  ]);
  setMemoryVisible(true);
  setMatchedSymbol(symbol.icon);
  setMatchMessage(null);
  setShowMatch(true);
  matchScale.value = withSpring(1);

  setTimeout(() => {
    dispatch({
      type: "MATCH_FOUND",
      payload: {
        cards: [],
        receiverIndex: 0,
        selectedCardIds: [centerCard.id, memoryCard.id],
        symbol: symbol.icon,
      },
    });
    clearSelection();
    dispatch({ type: "CLEAR_MATCH" });
    setMemoryVisible(false);
  }, 1000);
};
