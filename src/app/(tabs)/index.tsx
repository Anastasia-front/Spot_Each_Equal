import { getGameModes } from "@/constants";
import { useGame } from "@/context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ImageBackground,
  Modal,
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

  const { state, dispatch } = useGame();

  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [pendingMode, setPendingMode] = useState<any>(null);
  const [selectedPlayers, setSelectedPlayers] = useState<number | 2>(2);

  const handleGameModeSelect = (mode: any) => {
    setPendingMode(mode);
    setShowPlayerModal(true);
  };

  const handlePlayersSelect = (numPlayers: number) => {
    setSelectedPlayers(numPlayers);
  };

  const handleConfirm = () => {
    if (selectedPlayers) {
      dispatch({ type: "SET_NUM_PLAYERS", payload: selectedPlayers });
      setShowPlayerModal(false);
    }

    router.push({
      pathname: "/(tabs)/game",
      params: {
        gameMode: pendingMode.key,
        numPlayers: String(selectedPlayers),
      },
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
            <Text style={styles.footerText}>{t("findMatchingSymbol")}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      {/* Player selection modal */}
      <Modal visible={showPlayerModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("selectPlayers")}</Text>

            <View style={styles.playerOptions}>
              {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                <TouchableOpacity
                  key={n}
                  style={[
                    styles.playerButton,
                    selectedPlayers === n && styles.selectedPlayerButton,
                  ]}
                  onPress={() => handlePlayersSelect(n)}
                >
                  <Text
                    style={[
                      styles.playerButtonText,
                      selectedPlayers === n && styles.selectedPlayerText,
                    ]}
                  >
                    {n}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.confirmButton,
                !selectedPlayers && { opacity: 0.5 },
              ]}
              disabled={!selectedPlayers}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>{t("buttons.continue")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  gameModeCard: { marginBottom: 16, borderRadius: 20 },
  cardGradient: { borderRadius: 20, padding: 24 },
  cardContent: { flex: 1 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
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
    paddingTop: 10,
    borderRadius: 16,
  },
  playersText: { fontSize: 12, fontFamily: "Inter-SemiBold", color: "#FFFFFF" },
  cardDescription: {
    fontSize: 15,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
    opacity: 0.95,
    lineHeight: 22,
  },
  footer: { padding: 20, alignItems: "center" },
  footerText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Inter-Regular",
    opacity: 0.8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 24,
    borderRadius: 20,
    width: "85%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    marginBottom: 20,
    textAlign: "center",
  },
  playerOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  playerButton: {
    backgroundColor: "#667eea",
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    margin: 6,
  },
  selectedPlayerButton: {
    backgroundColor: "#764ba2",
  },
  playerButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "Inter-Bold",
  },
  selectedPlayerText: {
    color: "#FFD700",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "Inter-Bold",
  },
});

export default HomeScreen;
