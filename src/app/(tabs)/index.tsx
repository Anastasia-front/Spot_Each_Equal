import GameSession from "@/components/game/session/GameSession";
import ModeAccordionList from "@/components/home/ModeAccordionList";
import PlayerSelectModal from "@/components/home/PlayerSelectModal";
import { homeStyles as styles } from "@/components/home/home.styles";
import { GameMode, getGameModes } from "@/constants";
import { useGame } from "@/context";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useGame();
  const gameModes = getGameModes(t);

  const [activeGameMode, setActiveGameMode] = useState<string | null>(null);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [pendingMode, setPendingMode] = useState<GameMode | null>(null);
  const [selectedPlayers, setSelectedPlayers] = useState(2);
  const [openModeKey, setOpenModeKey] = useState<string | null>(
    gameModes[0]?.key ?? null,
  );

  const handleGameModeSelect = (mode: GameMode) => {
    const fixedPlayers = Number(mode.players);

    if (Number.isInteger(fixedPlayers)) {
      startMode(mode, fixedPlayers);
      return;
    }

    const options = getPlayerOptions(mode.players);
    setPendingMode(mode);
    setSelectedPlayers(options[0] ?? 2);
    setShowPlayerModal(true);
  };

  const handleConfirm = () => {
    if (!pendingMode) return;

    setShowPlayerModal(false);
    startMode(pendingMode, selectedPlayers);
  };

  const startMode = (mode: GameMode, numPlayers: number) => {
    dispatch({ type: "SET_NUM_PLAYERS", payload: numPlayers });
    setActiveGameMode(mode.key);
  };

  const handleGameBack = () => {
    dispatch({ type: "RESET_GAME" });
    setActiveGameMode(null);
  };

  const currentGameMode = activeGameMode ?? state.gameMode ?? undefined;

  if (currentGameMode) {
    return <GameSession gameMode={currentGameMode} onBack={handleGameBack} />;
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
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
        playerOptions={getPlayerOptions(pendingMode?.players)}
        selectedPlayers={selectedPlayers}
        selectPlayersLabel={t("selectPlayers")}
        visible={showPlayerModal}
        onClose={() => setShowPlayerModal(false)}
        onConfirm={handleConfirm}
        onSelectPlayers={setSelectedPlayers}
      />
    </SafeAreaView>
  );
};

const getPlayerOptions = (players?: string) => {
  if (!players) return [2];

  const fixedPlayers = Number(players);
  if (Number.isInteger(fixedPlayers)) return [fixedPlayers];

  const [min, max] = players.split("-").map(Number);
  if (!Number.isInteger(min) || !Number.isInteger(max) || min > max) {
    return [2];
  }

  return Array.from({ length: max - min + 1 }, (_, index) => min + index);
};

export default HomeScreen;
