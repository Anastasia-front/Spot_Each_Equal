import { Play } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

import { gameStyles as styles } from "../shared/game.styles";

type MatchNotificationProps = {
  animatedStyle: any;
  foundLabel: string;
  message?: string | null;
  symbolLabel: string;
  symbol: string | null;
  visible: boolean;
};

export const MatchNotification = ({
  animatedStyle,
  foundLabel,
  message,
  symbolLabel,
  symbol,
  visible,
}: MatchNotificationProps) => {
  if (!visible) return null;

  const formattedSymbol = symbol?.replace(/_/g, " ");

  return (
    <Animated.View style={[styles.matchNotification, animatedStyle]}>
      <Text style={styles.matchText}>{message ?? foundLabel}</Text>
      {symbol && (
        <Text style={styles.matchSymbol}>
          {symbolLabel}:{" "}
          <Text style={styles.matchSymbolName}>{formattedSymbol}</Text>
        </Text>
      )}
    </Animated.View>
  );
};

type PauseOverlayProps = {
  paused: boolean;
  pauseLabel: string;
  resumeLabel: string;
  onResume: () => void;
};

export const PauseOverlay = ({
  paused,
  pauseLabel,
  resumeLabel,
  onResume,
}: PauseOverlayProps) => {
  if (!paused) return null;

  return (
    <View style={styles.pauseOverlay}>
      <Text style={styles.pauseText}>{pauseLabel}</Text>
      <TouchableOpacity style={styles.resumeButton} onPress={onResume}>
        <Play size={24} color="#FFFFFF" />
        <Text style={styles.resumeButtonText}>{resumeLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};
