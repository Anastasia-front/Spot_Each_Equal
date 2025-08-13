import { getGameModes } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const HomeScreen = () => {
  const { t } = useTranslation();
  const gameModes = getGameModes(t);

  const handleGameModeSelect = (gameMode: any) => {
    router.push({
      pathname: "/(tabs)/game",
      params: { gameMode: gameMode.key },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        }}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.1 }}
      >
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          style={styles.background}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{t("gameTitle")}</Text>
            <Text style={styles.subtitle}>{t("selectGameMode")}</Text>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {gameModes.map((mode) => {
              const IconComponent = mode.icon;
              return (
                <TouchableOpacity
                  key={mode.key}
                  style={styles.gameModeCard}
                  onPress={() => handleGameModeSelect(mode)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={mode.color}
                    style={styles.cardGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.cardContent}>
                      <View style={styles.cardHeader}>
                        <View style={styles.titleRow}>
                          <IconComponent size={28} color="#FFFFFF" />
                          <Text style={styles.cardTitle}>{mode.title}</Text>
                        </View>
                        <View style={styles.playersTag}>
                          <Text style={styles.playersText}>
                            {mode.players} {t("players")}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.cardDescription}>
                        {mode.description}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Find the matching symbol between any two cards!
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
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
    textAlign: "center",
    marginBottom: 12,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
    opacity: 0.9,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  gameModeCard: {
    marginBottom: 16,
    borderRadius: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardGradient: {
    borderRadius: 20,
    padding: 24,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cardTitle: {
    fontSize: 26,
    fontFamily: "Inter-Bold",
    color: "#FFFFFF",
    marginLeft: 12,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  playersTag: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  playersText: {
    fontSize: 12,
    fontFamily: "Inter-SemiBold",
    color: "#FFFFFF",
  },
  cardDescription: {
    fontSize: 15,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
    opacity: 0.95,
    lineHeight: 22,
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Inter-Regular",
    opacity: 0.8,
    textAlign: "center",
  },
});

export default HomeScreen;
