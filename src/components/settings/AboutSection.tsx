import { Info } from "lucide-react-native";
import { Text, View } from "react-native";

import { settingsStyles as styles } from "./settings.styles";

type AboutSectionProps = {
  t: (key: string) => string;
};

const featureKeys = [
  "gameFeatures.cards",
  "gameFeatures.modes",
  "gameFeatures.multiplayer",
  "gameFeatures.languages",
  "gameFeatures.animations",
];

const AboutSection = ({ t }: AboutSectionProps) => (
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
        {featureKeys.map((featureKey) => (
          <Text key={featureKey} style={styles.featureItem}>
            • {t(featureKey)}
          </Text>
        ))}
      </View>

      <Text style={styles.versionText}>{t("version")} 1.0.0</Text>
    </View>
  </View>
);

export default AboutSection;
