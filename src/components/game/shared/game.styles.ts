import { StyleSheet } from "react-native";

import { rf, rs, screenHeight, vh } from "./responsive";

export { screenHeight, screenWidth } from "./responsive";

export const gameCanvasHeight = screenHeight * 0.62;

export const gameStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: rf(18),
    fontFamily: "Inter-Regular",
    color: "#666",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: vh(7.6),
    paddingHorizontal: rs(20, 14, 28),
    paddingVertical: rs(10, 8, 14),
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: rs(42, 36, 52),
    paddingHorizontal: rs(12, 9, 18),
    paddingVertical: rs(8, 6, 11),
    backgroundColor: "#F8F9FF",
    borderRadius: rs(20, 16, 26),
    marginHorizontal: rs(4, 2, 7),
  },
  headerButtonText: {
    fontSize: rf(14, 12, 17),
    fontFamily: "Inter-SemiBold",
    color: "#667eea",
    marginLeft: rs(6, 4, 9),
  },
  headerActions: {
    flexDirection: "row",
  },
  gameModeTitle: {
    fontSize: rf(20, 18, 26),
    fontFamily: "Inter-Bold",
    color: "#2C3E50",
  },
  matchNotification: {
    position: "absolute",
    top: vh(6.5),
    left: 0,
    right: 0,
    backgroundColor: "#4ECDC4",
    paddingVertical: rs(15, 11, 20),
    paddingHorizontal: rs(20, 14, 30),
    alignItems: "center",
    zIndex: 20,
  },
  matchText: {
    fontSize: rf(18),
    fontFamily: "Inter-Bold",
    color: "#FFFFFF",
    marginBottom: rs(4, 3, 7),
  },
  matchSymbol: {
    fontSize: rf(14, 12, 17),
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
    opacity: 0.9,
  },
  matchSymbolName: {
    fontFamily: "Inter-Bold",
  },
  pauseOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  pauseText: {
    fontSize: rf(24, 20, 32),
    fontFamily: "Inter-Bold",
    color: "#FFFFFF",
    marginBottom: rs(20, 16, 28),
  },
  resumeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#667eea",
    paddingHorizontal: rs(24, 18, 34),
    paddingVertical: rs(12, 9, 17),
    borderRadius: rs(25, 20, 32),
  },
  resumeButtonText: {
    fontSize: rf(16, 13, 20),
    fontFamily: "Inter-SemiBold",
    color: "#FFFFFF",
    marginLeft: rs(8, 6, 12),
  },
  gameArea: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    overflow: "hidden",
  },
  cardsGrid: {
    flex: 1,
    position: "relative",
    zIndex: 2,
  },
  twoCardsStack: {
    flex: 1,
    justifyContent: "center",
  },
  twoCardSlot: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredCard: {
    margin: 0,
  },
  instructions: {
    backgroundColor: "#FFFFFF",
    minHeight: vh(8.1),
    paddingVertical: rs(15, 10, 20),
    paddingHorizontal: rs(20, 14, 30),
    borderTopWidth: 1,
    borderTopColor: "#E1E8ED",
  },
  instructionsText: {
    fontSize: rf(14, 12, 18),
    fontFamily: "Inter-Regular",
    color: "#666",
    textAlign: "center",
    lineHeight: rf(20, 17, 25),
  },
});

export * from "./modeShared.styles";
