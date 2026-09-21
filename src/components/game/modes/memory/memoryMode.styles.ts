import { StyleSheet } from "react-native";

import { modeSharedStyleValues } from "../../shared/modeShared.styles";
import { rf, rs } from "../../shared/responsive";

export const memoryModeStyles = StyleSheet.create({
  board: modeSharedStyleValues.board,
  timerRow: {
    alignItems: "center",
    paddingBottom: rs(4, 2, 8),
  },
  timerText: {
    color: "#2C3E50",
    fontFamily: "Inter-Bold",
    fontSize: rf(16, 13, 20),
  },
  cardsColumn: modeSharedStyleValues.cardsColumn,
  memoryCardSlot: modeSharedStyleValues.cardSlotCenter,
  centerCardSlot: modeSharedStyleValues.centerCardSlot,
  cardLabel: modeSharedStyleValues.cardLabel,
  scoreRail: {
    ...modeSharedStyleValues.scoreRail,
    top: rs(44, 34, 68),
  },
  scorePill: modeSharedStyleValues.scorePill,
  scoreName: modeSharedStyleValues.scoreName,
  scoreValue: modeSharedStyleValues.scoreValue,
  centerDeckCount: modeSharedStyleValues.centerDeckCount,
  centeredCard: modeSharedStyleValues.centeredCard,
});
