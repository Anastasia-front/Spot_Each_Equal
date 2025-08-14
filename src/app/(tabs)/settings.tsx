import { languages } from "@/constants";
import { Check, Globe, Info } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SettingsScreen = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t("buttons.settings")}</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Language Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Globe size={24} color="#667eea" />
            <Text style={styles.sectionTitle}>{t("language")}</Text>
          </View>

          <View style={styles.sectionContent}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageOption,
                  i18n.language === language.code && styles.selectedLanguage,
                ]}
                onPress={() => handleLanguageChange(language.code)}
              >
                <View style={styles.languageInfo}>
                  <Text style={styles.flagEmoji}>{language.flag}</Text>
                  <Text
                    style={[
                      styles.languageText,
                      i18n.language === language.code &&
                        styles.selectedLanguageText,
                    ]}
                  >
                    {language.name}
                  </Text>
                </View>
                {i18n.language === language.code && (
                  <Check size={20} color="#667eea" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Info size={24} color="#667eea" />
            <Text style={styles.sectionTitle}>{t("aboutTitle")}</Text>
          </View>

          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>{t("gameTitle")}</Text>
            <Text style={styles.aboutText}>{t("aboutDescription")}</Text>

            <View style={styles.gameFeatures}>
              <Text style={styles.featureTitle}>{t("gameFeaturesTitle")}</Text>
              <Text style={styles.featureItem}>
                • {t("gameFeatures.cards")}
              </Text>
              <Text style={styles.featureItem}>
                • {t("gameFeatures.modes")}
              </Text>
              <Text style={styles.featureItem}>
                • {t("gameFeatures.multiplayer")}
              </Text>
              <Text style={styles.featureItem}>
                • {t("gameFeatures.languages")}
              </Text>
              <Text style={styles.featureItem}>
                • {t("gameFeatures.animations")}
              </Text>
            </View>

            <Text style={styles.versionText}>{t("version")} 1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default SettingsScreen;
