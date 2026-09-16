import { gameStyles as styles } from "@/components/game/game.styles";
import GameBoard from "@/components/game/GameBoard";
import GameHeader from "@/components/game/GameHeader";
import {
  MatchNotification,
  PauseOverlay,
} from "@/components/game/GameOverlays";
import { useGame } from "@/context/GameContext";
import { useGameRound } from "@/hooks/useGameRound";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GameScreen = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useGame();
  const { gameMode: rawGameMode } = useLocalSearchParams();
  const gameMode = Array.isArray(rawGameMode) ? rawGameMode[0] : rawGameMode;

  const round = useGameRound({ dispatch, gameMode, state });

  const handlePauseToggle = () => {
    dispatch({ type: state.gamePaused ? "RESUME_GAME" : "PAUSE_GAME" });
  };

  if (!state.cards.length) {
    return (
      <SafeAreaView edges={["top"]} style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t("loading")}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        <GameHeader
          backLabel={t("buttons.back")}
          title={t(`gameModes.${gameMode}`)}
          paused={state.gamePaused}
          onNewGame={round.handleNewGame}
          onPauseToggle={handlePauseToggle}
        />

        <MatchNotification
          animatedStyle={round.matchAnimatedStyle}
          foundLabel={t("foundMatch")}
          symbolLabel={t("symbolLabel")}
          symbol={round.matchedSymbol}
          visible={round.showMatch}
        />

        <PauseOverlay
          paused={state.gamePaused}
          pauseLabel={t("gamePaused")}
          resumeLabel={t("buttons.resume")}
          onResume={handlePauseToggle}
        />

        <GameBoard
          cards={state.cards}
          cardsToMatch={round.cardsToMatch}
          cardSize={round.cardSize}
          disabled={state.gamePaused}
          selectedSymbols={round.selectedSymbols}
          dealtCardAnimatedStyle={round.dealtCardAnimatedStyle}
          onSymbolPress={round.handleSymbolPress}
        />

        <View style={styles.instructions}>
          <Text style={styles.instructionsText}>
            {t("instructions.findSymbol", { count: round.cardsToMatch })}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GameScreen;
