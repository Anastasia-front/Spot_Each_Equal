import { languages } from "@/constants";
import { Check, Globe } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

import { settingsStyles as styles } from "./settings.styles";

type LanguageSectionProps = {
  currentLanguage: string;
  languageLabel: string;
  onLanguageChange: (languageCode: string) => void;
};

const LanguageSection = ({
  currentLanguage,
  languageLabel,
  onLanguageChange,
}: LanguageSectionProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Globe size={24} color="#667eea" />
      <Text style={styles.sectionTitle}>{languageLabel}</Text>
    </View>

    <View style={styles.sectionContent}>
      {languages.map((language) => {
        const selected = currentLanguage === language.code;

        return (
          <TouchableOpacity
            key={language.code}
            style={[styles.languageOption, selected && styles.selectedLanguage]}
            onPress={() => onLanguageChange(language.code)}
          >
            <View style={styles.languageInfo}>
              <Text style={styles.flagEmoji}>{language.flag}</Text>
              <Text
                style={[
                  styles.languageText,
                  selected && styles.selectedLanguageText,
                ]}
              >
                {language.name}
              </Text>
            </View>
            {selected && <Check size={20} color="#667eea" />}
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

export default LanguageSection;
