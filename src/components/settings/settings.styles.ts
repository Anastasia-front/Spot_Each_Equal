import { StyleSheet } from "react-native";

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "#2C3E50",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: "#2C3E50",
    marginLeft: 12,
  },
  sectionContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
  },
  languageOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  selectedLanguage: {
    backgroundColor: "#F8F9FF",
  },
  languageInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  flagEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  languageText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#2C3E50",
  },
  selectedLanguageText: {
    color: "#667eea",
    fontFamily: "Inter-SemiBold",
  },
  aboutCard: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 16,
  },
  aboutTitle: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
    color: "#2C3E50",
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 15,
    fontFamily: "Inter-Regular",
    color: "#666",
    lineHeight: 22,
    marginBottom: 20,
  },
  gameFeatures: {
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#2C3E50",
    marginBottom: 8,
  },
  featureItem: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#666",
    lineHeight: 20,
    marginBottom: 4,
  },
  versionText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#999",
    fontStyle: "italic",
  },
});
