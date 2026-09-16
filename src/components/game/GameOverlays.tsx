import { Play } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

import { gameStyles as styles } from "./game.styles";

type MatchNotificationProps = {
  animatedStyle: any;
  foundLabel: string;
  symbolLabel: string;
  symbol: string | null;
  visible: boolean;
};

export const MatchNotification = ({
  animatedStyle,
  foundLabel,
  symbolLabel,
  symbol,
  visible,
}: MatchNotificationProps) => {
  if (!visible) return null;

  return (
    <Animated.View style={[styles.matchNotification, animatedStyle]}>
      <Text style={styles.matchText}>{foundLabel}</Text>
      <Text style={styles.matchSymbol}>
        {symbolLabel}: {symbol}
      </Text>
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
