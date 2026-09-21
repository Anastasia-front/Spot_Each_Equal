import { withSpring } from "react-native-reanimated";

import { SelectedSymbol } from "@/components/game/shared/types";

import { getStackPairReceiverIndex, isDuelPair, isResetPair } from "@/utils";

import { SymbolPressArgs } from "./symbolPressHandlers.types";

export const handlePairSymbolPress = ({
  animateCenterCardToReceiver,
  card,
  cardsToMatch,
  clearSelection,
  current,
  dispatch,
  duelMode,
  gameMode,
  matchScale,
  resetMode,
  selectedSymbols,
  setMatchedSymbol,
  setMatchMessage,
  setSelectedSymbols,
  setShowMatch,
  smallPileMode,
  stackMode,
  state,
  symbol,
}: SymbolPressArgs & { current: SelectedSymbol }) => {
  const previous = selectedSymbols[0];

  if (!previous || previous.cardId === card.id) {
    setSelectedSymbols([current]);
    return;
  }

  const selectedCardIds = [previous.cardId, current.cardId];
  const receiverIndex = stackMode
    ? getStackPairReceiverIndex(state, selectedCardIds, gameMode)
    : -1;
  const validStackPair = !stackMode || receiverIndex >= 0;
  const validResetPair = !resetMode || isResetPair(state, selectedCardIds);
  const validDuelPair = !duelMode || isDuelPair(state, selectedCardIds);
  const validSmallPilePair =
    !smallPileMode || previous.cardId !== current.cardId;
  const status =
    previous.icon === symbol.icon &&
    validStackPair &&
    validResetPair &&
    validDuelPair &&
    validSmallPilePair
      ? "success"
      : "error";

  setSelectedSymbols([
    { ...previous, status },
    { ...current, status },
  ]);

  if (status === "error") {
    setTimeout(() => setSelectedSymbols([]), 1000);
    return;
  }

  setMatchedSymbol(symbol.icon);
  setMatchMessage(null);
  setShowMatch(true);
  matchScale.value = withSpring(1);

  setTimeout(() => {
    const payload = {
      cards:
        resetMode || duelMode || smallPileMode
          ? []
          : state.cards.slice(0, cardsToMatch),
      playerIndex: resetMode || duelMode || smallPileMode ? 0 : undefined,
      receiverIndex,
      selectedCardIds,
      symbol: symbol.icon,
    };

    if (stackMode) {
      animateCenterCardToReceiver(receiverIndex, () => {
        dispatch({ type: "MATCH_FOUND", payload });
        clearSelection();
        dispatch({ type: "CLEAR_MATCH" });
      });
      return;
    }

    dispatch({ type: "MATCH_FOUND", payload });
    clearSelection();
    dispatch({ type: "CLEAR_MATCH" });
  }, 1000);
};
