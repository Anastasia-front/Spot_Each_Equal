import { Dimensions, StyleSheet } from "react-native";

export const { width: screenWidth, height: screenHeight } =
  Dimensions.get("window");

export const gameCanvasHeight = screenHeight * 0.64;

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
    fontSize: 18,
    fontFamily: "Inter-Regular",
    color: "#666",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#F8F9FF",
    borderRadius: 20,
    marginHorizontal: 4,
  },
  headerButtonText: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: "#667eea",
    marginLeft: 6,
  },
  headerActions: {
    flexDirection: "row",
  },
  gameModeTitle: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "#2C3E50",
  },
  matchNotification: {
    backgroundColor: "#4ECDC4",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  matchText: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  matchSymbol: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
    opacity: 0.9,
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
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  resumeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#667eea",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  resumeButtonText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#FFFFFF",
    marginLeft: 8,
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#E1E8ED",
  },
  instructionsText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
});
