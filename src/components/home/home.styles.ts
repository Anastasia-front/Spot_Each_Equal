import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#667eea" },
  backgroundImage: { flex: 1 },
  background: { flex: 1 },
  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontFamily: "Inter-Bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
    opacity: 0.9,
  },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
  gameModeCard: {
    marginBottom: 12,
    borderRadius: 18,
    overflow: "hidden",
  },
  cardGradient: { borderRadius: 18, padding: 18 },
  cardContent: { flex: 1 },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleRow: { flexDirection: "row", alignItems: "center", flex: 1 },
  cardTitle: {
    fontSize: 26,
    fontFamily: "Inter-Bold",
    color: "#FFFFFF",
    marginLeft: 12,
  },
  playersTag: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  playersText: { fontSize: 12, fontFamily: "Inter-SemiBold", color: "#FFFFFF" },
  dropdownIcon: {
    marginLeft: 10,
    transform: [{ rotate: "0deg" }],
  },
  dropdownIconOpen: {
    transform: [{ rotate: "180deg" }],
  },
  dropdownBody: {
    marginTop: 16,
  },
  cardDescription: {
    fontSize: 15,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
    opacity: 0.95,
    lineHeight: 22,
  },
  selectModeButton: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.28)",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    marginTop: 14,
  },
  selectModeText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Inter-Bold",
  },
  footer: { padding: 20, alignItems: "center" },
  footerText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Inter-Regular",
    opacity: 0.8,
  },
});
