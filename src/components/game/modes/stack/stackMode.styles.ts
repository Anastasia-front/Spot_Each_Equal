import { StyleSheet } from "react-native";

import { modeSharedStyleValues } from "../../shared/modeShared.styles";
import { rf, rs, vh } from "../../shared/responsive";

export const stackModeStyles = StyleSheet.create({
  stackBoard: modeSharedStyleValues.board,
  meCardsColumn: modeSharedStyleValues.cardsColumn,
  cardSlot: modeSharedStyleValues.centerCardSlot,
  playerStack: {
    alignItems: "center",
  },
  playerStackLabel: modeSharedStyleValues.localLabel,
  scoreRail: modeSharedStyleValues.scoreRail,
  scorePill: modeSharedStyleValues.scorePill,
  scoreName: modeSharedStyleValues.scoreName,
  scoreValue: modeSharedStyleValues.scoreValue,
  centerDeckCount: modeSharedStyleValues.centerDeckCount,
  youBoard: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingHorizontal: rs(10, 6, 18),
    paddingVertical: rs(6, 4, 11),
  },
  youTopRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    minHeight: vh(18),
  },
  tinyLocalStack: {
    alignItems: "center",
    marginLeft: rs(8, 4, 14),
    width: rs(70, 54, 96),
  },
  tinyLocalLabel: {
    color: "#6C7784",
    fontFamily: "Inter-SemiBold",
    fontSize: rf(10, 9, 13),
    marginBottom: rs(2, 1, 4),
  },
  tinyLocalScore: {
    color: "#2C3E50",
    fontFamily: "Inter-Bold",
    fontSize: rf(13, 11, 17),
    marginTop: rs(2, 1, 4),
  },
  opponentRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: rs(12, 8, 22),
    justifyContent: "center",
    minHeight: vh(19),
  },
  opponentTriangle: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: vh(33),
  },
  opponentTriangleTopRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: rs(28, 16, 46),
    justifyContent: "center",
  },
  opponentTriangleBottomRow: {
    alignItems: "center",
    marginTop: rs(-10, -14, -5),
  },
  centeredCard: modeSharedStyleValues.centeredCard,
  flyingCard: {
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: rs(20, 12, 34),
    zIndex: 20,
  },
});
