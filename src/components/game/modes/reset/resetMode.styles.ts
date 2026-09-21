import { StyleSheet } from "react-native";

import { modeSharedStyleValues } from "../../shared/modeShared.styles";

export const resetModeStyles = StyleSheet.create({
  board: modeSharedStyleValues.board,
  cardsColumn: modeSharedStyleValues.cardsColumn,
  cardSlot: modeSharedStyleValues.centerCardSlot,
  localCardSlot: modeSharedStyleValues.cardSlotCenter,
  localLabel: modeSharedStyleValues.localLabel,
  scoreRail: modeSharedStyleValues.scoreRail,
  scorePill: modeSharedStyleValues.scorePill,
  scoreName: modeSharedStyleValues.scoreName,
  scoreValue: modeSharedStyleValues.scoreValue,
  centerDeckCount: modeSharedStyleValues.centerDeckCount,
  centeredCard: modeSharedStyleValues.centeredCard,
});
