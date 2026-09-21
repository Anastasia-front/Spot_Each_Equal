import { Platform } from "react-native";

import { SelectedSymbol } from "@/components/game/shared/types";

import { handleMemorySymbolPress } from "./memorySymbolPressHandler";
import { handlePairSymbolPress } from "./pairSymbolPressHandler";
import { SymbolPressArgs } from "./symbolPressHandlers.types";

export const handleRoundSymbolPress = (args: SymbolPressArgs) => {
  const { card, selectedSymbols, state, symbol, symbolIndex } = args;

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

  if (args.memoryMode) {
    handleMemorySymbolPress({ ...args, current });
    return;
  }

  handlePairSymbolPress({ ...args, current });
};
