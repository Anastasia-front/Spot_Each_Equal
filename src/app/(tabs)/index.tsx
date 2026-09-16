import ModeAccordionList from "@/components/home/ModeAccordionList";
import PlayerSelectModal from "@/components/home/PlayerSelectModal";
import { homeStyles as styles } from "@/components/home/home.styles";
import { GameMode, getGameModes } from "@/constants";
import { useGame } from "@/context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { t } = useTranslation();
  const { dispatch } = useGame();
  const gameModes = getGameModes(t);

  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [pendingMode, setPendingMode] = useState<GameMode | null>(null);
  const [selectedPlayers, setSelectedPlayers] = useState(2);
  const [openModeKey, setOpenModeKey] = useState<string | null>(
    gameModes[0]?.key ?? null,
  );

  const handleGameModeSelect = (mode: GameMode) => {
    setPendingMode(mode);
    setShowPlayerModal(true);
  };

  const handleConfirm = () => {
    if (!pendingMode) return;

    dispatch({ type: "SET_NUM_PLAYERS", payload: selectedPlayers });
    setShowPlayerModal(false);
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

          <ModeAccordionList
            gameModes={gameModes}
            openModeKey={openModeKey}
            playLabel={t("buttons.play")}
            playersLabel={t("players")}
            setOpenModeKey={setOpenModeKey}
            onSelectMode={handleGameModeSelect}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>{t("findMatchingSymbol")}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      <PlayerSelectModal
        continueLabel={t("buttons.continue")}
        selectedPlayers={selectedPlayers}
        selectPlayersLabel={t("selectPlayers")}
        visible={showPlayerModal}
        onConfirm={handleConfirm}
        onSelectPlayers={setSelectedPlayers}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
