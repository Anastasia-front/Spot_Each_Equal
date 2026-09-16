import React from "react";

import { Dimensions, TouchableOpacity, ViewStyle } from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

import { getRoundedHexagonPath } from "@/utils/hexagonPath";

import HexagonCardSymbols from "./HexagonCardSymbols";

const { width: screenWidth } = Dimensions.get("window");

interface HexagonCardProps {
  card: any;
  size?: number;
  onSymbolPress?: (symbol: any, symbolIndex: number) => void;
  selectedSymbols?: Record<number, "selected" | "error" | "success">;
  disabled?: boolean;
  style?: ViewStyle;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const HexagonCard: React.FC<HexagonCardProps> = ({
  card,
  size = screenWidth,
  onSymbolPress,
  selectedSymbols = {},
  disabled = false,
  style,
}) => {
  const hexagonPath = getRoundedHexagonPath(size);
  const centerX = size / 2;
  const centerY = size / 2;

  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
    rotation.value = withSpring(2);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    rotation.value = withSpring(0);
  };

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
          margin: 10,
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

        {/* Render symbols */}
        <G clipPath={`url(#card-clip-${card.id})`}>
          <HexagonCardSymbols
            card={card}
            centerX={centerX}
            centerY={centerY}
            disabled={disabled}
            onSymbolPress={onSymbolPress}
            selectedSymbols={selectedSymbols}
            size={size}
          />
        </G>
      </Svg>
    </AnimatedTouchableOpacity>
  );
};

export default HexagonCard;
