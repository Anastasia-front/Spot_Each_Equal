import GameBoard from "@/components/game/board/GameBoard";
import GameHeader from "@/components/game/header/GameHeader";
import {
  MatchNotification,
  PauseOverlay,
} from "@/components/game/overlays/GameOverlays";
import GameResultsOverlay from "@/components/game/results/GameResultsOverlay";
import { gameStyles as styles } from "@/components/game/shared/game.styles";
import { useGame } from "@/context/GameContext";
import { useGameRound } from "@/hooks/useGameRound";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type GameSessionProps = {
  gameMode?: string;
  onBack?: () => void;
};

const GameSession = ({ gameMode, onBack }: GameSessionProps) => {
  const { t } = useTranslation();
  const { state, dispatch } = useGame();
  const round = useGameRound({ dispatch, gameMode, state });

  const handlePauseToggle = () => {
    dispatch({ type: state.gamePaused ? "RESUME_GAME" : "PAUSE_GAME" });
  };

  if (!state.gameOver && !state.cards.length && !state.centerDeck.length) {
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
          title={t(`gameModes.${state.gameMode ?? gameMode}`)}
          paused={state.gamePaused}
          onBack={onBack}
          onNewGame={round.handleNewGame}
          onPauseToggle={handlePauseToggle}
        />

        <MatchNotification
          animatedStyle={round.matchAnimatedStyle}
          foundLabel={t("foundMatch")}
          message={round.matchMessage}
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

        <GameResultsOverlay
          finishedPlayerIndexes={state.finishedPlayerIndexes}
          foundStacks={state.foundStacks}
          gameMode={state.gameMode}
          initialPlayerCardCount={state.initialPlayerCardCount}
          newGameLabel={t("buttons.newGame")}
          players={state.players}
          playerStacks={state.playerStacks}
          pointsLabel={t("results.points")}
          title={t("results.title")}
          visible={state.gameOver}
          winnerLabel={t("results.winner")}
          onNewGame={round.handleNewGame}
        />

        <GameBoard
          cards={state.cards}
          cardsToMatch={round.cardsToMatch}
          cardSize={round.cardSize}
          collectAnimatedStyle={round.collectAnimatedStyle}
          collectingCard={round.collectingCard}
          collectingReceiverIndex={round.collectingReceiverIndex}
          centerDeck={state.centerDeck}
          disabled={state.gamePaused}
          foundStacks={state.foundStacks}
          gameMode={state.gameMode}
          memoryCards={state.memoryCards}
          memorySeconds={round.memorySeconds}
          memoryVisible={round.memoryVisible}
          players={state.players}
          playerStacks={state.playerStacks}
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

export default GameSession;
