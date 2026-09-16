import { router } from "expo-router";
import { ArrowLeft, Pause, Play, RotateCcw } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

import { gameStyles as styles } from "./game.styles";

type GameHeaderProps = {
  backLabel: string;
  title: string;
  paused: boolean;
  onNewGame: () => void;
  onPauseToggle: () => void;
};

const GameHeader = ({
  backLabel,
  title,
  paused,
  onNewGame,
  onPauseToggle,
}: GameHeaderProps) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
      <ArrowLeft size={20} color="#667eea" />
      <Text style={styles.headerButtonText}>{backLabel}</Text>
    </TouchableOpacity>

    <Text style={styles.gameModeTitle}>{title}</Text>

    <View style={styles.headerActions}>
      <TouchableOpacity style={styles.headerButton} onPress={onPauseToggle}>
        {paused ? (
          <Play size={20} color="#667eea" />
        ) : (
          <Pause size={20} color="#667eea" />
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.headerButton} onPress={onNewGame}>
        <RotateCcw size={20} color="#667eea" />
      </TouchableOpacity>
    </View>
  </View>
);

export default GameHeader;
