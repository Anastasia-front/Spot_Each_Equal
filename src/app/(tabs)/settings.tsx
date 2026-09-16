import AboutSection from "@/components/settings/AboutSection";
import LanguageSection from "@/components/settings/LanguageSection";
import { settingsStyles as styles } from "@/components/settings/settings.styles";
import { ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  const { t, i18n } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("buttons.settings")}</Text>
      </View>

      <ScrollView style={styles.content}>
        <LanguageSection
          currentLanguage={i18n.language}
          languageLabel={t("language")}
          onLanguageChange={i18n.changeLanguage}
        />
        <AboutSection t={t} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
