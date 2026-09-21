import { StyleSheet } from "react-native";

import { modeSharedStyleValues } from "../../shared/modeShared.styles";
import { rs } from "../../shared/responsive";

export const smallPileModeStyles = StyleSheet.create({
  board: {
    ...modeSharedStyleValues.board,
    paddingHorizontal: rs(8, 5, 14),
  },
  pileArea: {
    flex: 1,
    marginRight: rs(82, 68, 112),
    overflow: "hidden",
    position: "relative",
  },
  scatteredCard: {
    margin: 0,
    position: "absolute",
  },
  scoreRail: {
    ...modeSharedStyleValues.scoreRail,
    zIndex: 1000,
  },
  scorePill: modeSharedStyleValues.scorePill,
  scoreName: modeSharedStyleValues.scoreName,
  scoreValue: modeSharedStyleValues.scoreValue,
});
