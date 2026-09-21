import React, { useCallback, useMemo } from "react";

import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

import { rs, screenWidth } from "@/components/game/shared/responsive";
import { getRoundedHexagonPath } from "@/utils/hexagonPath";

import HexagonCardSymbols from "./HexagonCardSymbols";

interface HexagonCardProps {
  card: any;
  size?: number;
  onSymbolPress?: (symbol: any, symbolIndex: number) => void;
  selectedSymbols?: Record<number, "selected" | "error" | "success">;
  disabled?: boolean;
  faceDown?: boolean;
  style?: StyleProp<ViewStyle>;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const HexagonCard: React.FC<HexagonCardProps> = ({
  card,
  size = screenWidth,
  onSymbolPress,
  selectedSymbols = {},
  disabled = false,
  faceDown = false,
  style,
}) => {
  const hexagonPath = useMemo(() => getRoundedHexagonPath(size), [size]);
  const centerX = size / 2;
  const centerY = size / 2;

  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
    };
  });

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.98, { damping: 18, stiffness: 220 });
    rotation.value = withSpring(0.6, { damping: 18, stiffness: 220 });
  }, [rotation, scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 18, stiffness: 220 });
    rotation.value = withSpring(0, { damping: 18, stiffness: 220 });
  }, [rotation, scale]);

  return (
    <AnimatedTouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={0.95}
      style={[
        {
          width: size,
          height: size,
          margin: rs(10, 4, 14),
        },
        style,
        animatedStyle,
      ]}
    >
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <ClipPath id={`card-clip-${card.id}`}>
            <Path d={hexagonPath} />
          </ClipPath>
        </Defs>

        {/* Hexagon shadow */}
        <Path d={hexagonPath} fill="#00000015" transform="translate(3 4)" />

        {/* Hexagon background */}
        <Path
          d={hexagonPath}
          fill={card.isColorCard === false ? "#F6F7F5" : "#FFFDF8"}
          stroke="#D5D1C8"
          strokeWidth={1.5}
          opacity={disabled ? 0.6 : 1}
        />

        <G clipPath={`url(#card-clip-${card.id})`}>
          {faceDown ? (
            <>
              <Path d={hexagonPath} fill="#667eea" opacity={0.96} />
              <Path
                d={hexagonPath}
                fill="none"
                stroke="#FFFFFF"
                strokeDasharray={`${size * 0.05} ${size * 0.045}`}
                strokeWidth={size * 0.018}
                transform={`scale(0.78) translate(${size * 0.14} ${size * 0.14})`}
              />
            </>
          ) : (
            <HexagonCardSymbols
              card={card}
              centerX={centerX}
              centerY={centerY}
              disabled={disabled}
              onSymbolPress={onSymbolPress}
              selectedSymbols={selectedSymbols}
              size={size}
            />
          )}
        </G>
      </Svg>
    </AnimatedTouchableOpacity>
  );
};

const selectedSymbolsAreEqual = (
  previous: HexagonCardProps["selectedSymbols"] = {},
  next: HexagonCardProps["selectedSymbols"] = {},
) => {
  const previousKeys = Object.keys(previous);
  const nextKeys = Object.keys(next);

  return (
    previousKeys.length === nextKeys.length &&
    previousKeys.every((key) => previous[Number(key)] === next[Number(key)])
  );
};

export default React.memo(
  HexagonCard,
  (previous, next) =>
    previous.card === next.card &&
    previous.size === next.size &&
    previous.disabled === next.disabled &&
    previous.faceDown === next.faceDown &&
    previous.style === next.style &&
    selectedSymbolsAreEqual(previous.selectedSymbols, next.selectedSymbols),
);
