import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { screenHeight, screenWidth } from "../shared/game.styles";

const COLORS = ["#FFD43B", "#FF6B6B", "#4ECDC4", "#667eea", "#2ECC71"];
const PIECES = Array.from({ length: 34 }, (_, index) => ({
  color: COLORS[index % COLORS.length],
  delay: index * 34,
  drift: ((index % 7) - 3) * 13,
  left: (index * 31) % Math.round(screenWidth),
  rotation: (index * 47) % 360,
  startY: -screenHeight * (0.26 + (index % 5) * 0.04),
}));

const ConfettiPiece = ({ piece }: { piece: (typeof PIECES)[number] }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      piece.delay,
      withTiming(1, {
        duration: 1800,
        easing: Easing.out(Easing.quad),
      }),
    );
  }, [piece.delay, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity:
      progress.value < 0.08
        ? progress.value / 0.08
        : Math.max(0, 1 - progress.value),
    transform: [
      { translateX: piece.drift * progress.value },
      { translateY: (screenHeight * 0.96 + 80) * progress.value },
      { rotate: `${piece.rotation + progress.value * 520}deg` },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: piece.startY,
          left: piece.left,
          width: 8,
          height: 14,
          borderRadius: 2,
          backgroundColor: piece.color,
        },
        animatedStyle,
      ]}
    />
  );
};

const ConfettiBurst = ({ visible }: { visible: boolean }) => {
  if (!visible) return null;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {PIECES.map((piece, index) => (
        <ConfettiPiece key={index} piece={piece} />
      ))}
    </View>
  );
};

export default ConfettiBurst;
