import { StyleSheet } from "react-native";

import { rf, rs, vw } from "../shared/responsive";

export const gameResultsStyles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(21, 30, 42, 0.5)",
    padding: rs(24, 16, 36),
    zIndex: 900,
  },
  panel: {
    width: "100%",
    maxWidth: vw(88),
    borderRadius: rs(24, 18, 32),
    backgroundColor: "#FFFFFF",
    padding: rs(24, 18, 34),
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 22,
    elevation: 8,
  },
  title: {
    color: "#2C3E50",
    fontFamily: "Inter-Bold",
    fontSize: rf(26, 22, 34),
    marginBottom: rs(8, 5, 12),
    textAlign: "center",
  },
  winner: {
    color: "#667eea",
    fontFamily: "Inter-SemiBold",
    fontSize: rf(17, 14, 22),
    marginBottom: rs(18, 12, 26),
    textAlign: "center",
  },
  scoreRow: {
    alignItems: "center",
    borderBottomColor: "#EEF2F6",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: rs(10, 7, 15),
  },
  scoreName: {
    color: "#2C3E50",
    fontFamily: "Inter-SemiBold",
    fontSize: rf(16, 13, 21),
  },
  scoreValue: {
    color: "#7C8794",
    fontFamily: "Inter-Bold",
    fontSize: rf(16, 13, 21),
  },
  button: {
    alignItems: "center",
    backgroundColor: "#667eea",
    borderRadius: rs(18, 14, 24),
    marginTop: rs(22, 16, 30),
    paddingVertical: rs(13, 10, 18),
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Inter-Bold",
    fontSize: rf(16, 13, 21),
  },
});
