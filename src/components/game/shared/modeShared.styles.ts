import { TextStyle, ViewStyle } from "react-native";

import { rf, rs } from "./responsive";

export const modeSharedStyleValues: {
  board: ViewStyle;
  cardSlotCenter: ViewStyle;
  cardsColumn: ViewStyle;
  centerCardSlot: ViewStyle;
  centerDeckCount: TextStyle;
  centeredCard: ViewStyle;
  localLabel: TextStyle;
  cardLabel: TextStyle;
  scoreName: TextStyle;
  scorePill: ViewStyle;
  scoreRail: ViewStyle;
  scoreValue: TextStyle;
} = {
  board: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: rs(12, 8, 20),
    paddingVertical: rs(8, 5, 14),
  },
  cardsColumn: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-evenly",
    paddingRight: rs(72, 60, 118),
  },
  cardSlotCenter: {
    alignItems: "center",
  },
  centerCardSlot: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  centeredCard: {
    margin: 0,
  },
  centerDeckCount: {
    backgroundColor: "#667eea",
    borderRadius: rs(17, 14, 22),
    bottom: rs(6, 3, 10),
    color: "#FFFFFF",
    fontFamily: "Inter-Bold",
    fontSize: rf(13, 11, 17),
    height: rs(34, 28, 44),
    minWidth: rs(34, 28, 44),
    overflow: "hidden",
    paddingTop: rs(9, 7, 12),
    position: "absolute",
    right: rs(-4, -7, -3),
    textAlign: "center",
  },
  scoreName: {
    color: "#6C7784",
    fontFamily: "Inter-SemiBold",
    fontSize: rf(10, 9, 13),
  },
  scorePill: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E1E8ED",
    borderRadius: rs(14, 11, 18),
    borderWidth: 1,
    marginVertical: rs(4, 3, 6),
    paddingHorizontal: rs(8, 6, 12),
    paddingVertical: rs(7, 5, 10),
  },
  scoreRail: {
    bottom: rs(12, 8, 18),
    justifyContent: "center",
    position: "absolute",
    right: rs(8, 5, 14),
    top: rs(12, 8, 18),
    width: rs(82, 68, 112),
    zIndex: 5,
  },
  scoreValue: {
    color: "#2C3E50",
    fontFamily: "Inter-Bold",
    fontSize: rf(16, 13, 21),
    marginTop: rs(2, 1, 4),
  },
  localLabel: {
    color: "#2C3E50",
    fontFamily: "Inter-SemiBold",
    fontSize: rf(13, 11, 17),
    marginBottom: rs(6, 3, 9),
  },
  cardLabel: {
    color: "#2C3E50",
    fontFamily: "Inter-SemiBold",
    fontSize: rf(13, 11, 17),
    marginBottom: rs(4, 2, 8),
  },
};
