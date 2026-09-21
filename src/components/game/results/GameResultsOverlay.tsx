import { Text, TouchableOpacity, View } from "react-native";

import ConfettiBurst from "./ConfettiBurst";
import { getGameResults } from "./gameResults";
import { gameResultsStyles as styles } from "./gameResults.styles";

type GameResultsOverlayProps = {
  finishedPlayerIndexes?: number[];
  gameMode: string | null;
  foundStacks?: any[][];
  initialPlayerCardCount?: number;
  newGameLabel: string;
  players: string[];
  playerStacks: any[][];
  pointsLabel: string;
  title: string;
  visible: boolean;
  winnerLabel: string;
  onNewGame: () => void;
};

const GameResultsOverlay = ({
  finishedPlayerIndexes = [],
  gameMode,
  foundStacks = [],
  initialPlayerCardCount = 0,
  newGameLabel,
  players,
  playerStacks,
  pointsLabel,
  title,
  visible,
  winnerLabel,
  onNewGame,
}: GameResultsOverlayProps) => {
  if (!visible) return null;

  const results = getGameResults(
    gameMode,
    players,
    playerStacks,
    foundStacks,
    finishedPlayerIndexes,
    initialPlayerCardCount,
  );

  return (
    <View style={styles.overlay}>
      <ConfettiBurst visible={results.localPlayerWon} />
      <View style={styles.panel}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.winner}>
          {winnerLabel}: {results.winnerNames}
        </Text>

        {results.players.map((player, index) => (
          <View key={player.name} style={styles.scoreRow}>
            <Text style={styles.scoreName}>
              {results.isRanking ? `${index + 1}. ` : ""}
              {player.name}
            </Text>
            <Text style={styles.scoreValue}>
              {player.score} {pointsLabel}
            </Text>
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={onNewGame}>
          <Text style={styles.buttonText}>{newGameLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GameResultsOverlay;
