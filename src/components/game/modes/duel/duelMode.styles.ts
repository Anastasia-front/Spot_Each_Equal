import { StyleSheet } from "react-native";

import { modeSharedStyleValues } from "../../shared/modeShared.styles";
import { rf, rs } from "../../shared/responsive";

export const duelModeStyles = StyleSheet.create({
  board: modeSharedStyleValues.board,
  cardsColumn: modeSharedStyleValues.cardsColumn,
  cardSlot: modeSharedStyleValues.cardSlotCenter,
  cardLabel: modeSharedStyleValues.cardLabel,
  scoreRail: modeSharedStyleValues.scoreRail,
  scorePill: modeSharedStyleValues.scorePill,
  scoreName: modeSharedStyleValues.scoreName,
  scoreValue: modeSharedStyleValues.scoreValue,
  remainingValue: {
    color: "#8A94A1",
    fontFamily: "Inter-Regular",
    fontSize: rf(9, 8, 12),
    marginTop: rs(1, 0, 3),
  },
  centeredCard: modeSharedStyleValues.centeredCard,
});
