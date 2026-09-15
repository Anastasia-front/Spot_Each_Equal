import React from "react";

import { Dimensions, TouchableOpacity, ViewStyle } from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Svg, { Defs, G, Path, ClipPath } from "react-native-svg";

import * as Icons from "@/assets/icons";

import IconRenderer from "./IconRenderer";

const { width: screenWidth } = Dimensions.get("window");

interface HexagonCardProps {
  card: any;
  size?: number;
  onPress?: () => void;
  highlighted?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const HexagonCard: React.FC<HexagonCardProps> = ({
  card,
  size = screenWidth,
  onPress,
  highlighted = false,
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
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
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
        <Path
          d={hexagonPath}
          fill="#00000015"
          transform="translate(3 4)"
        />

        {/* Hexagon background */}
        <Path
          d={hexagonPath}
          fill={card.isColorCard === false ? "#F6F7F5" : "#FFFDF8"}
          stroke={highlighted ? "#FF6B6B" : "#D5D1C8"}
          strokeWidth={highlighted ? 4 : 1.5}
          opacity={disabled ? 0.6 : 1}
        />

        {/* Highlighted glow effect */}
        {highlighted && (
          <Path
            d={hexagonPath}
            fill="none"
            stroke="#FF6B6B40"
            strokeWidth={8}
          />
        )}

        {/* Render symbols */}
        <G clipPath={`url(#card-clip-${card.id})`}>
          {card.symbols.map((symbol: any, index: number) => {
            const radius = size * 0.5;
            const iconSize = size * (symbol.size ?? 0.2);

            const x = centerX + symbol.position.x * (radius * 0.72);
            const y = centerY + symbol.position.y * (radius * 0.72);

            return (
              <G
                key={index}
                transform={`translate(${x}, ${y}) rotate(${symbol.rotation ?? 0}) translate(${-iconSize / 2}, ${-iconSize / 2})`}
              >
                <IconRenderer
                  icon={Icons[symbol.icon as keyof typeof Icons]}
                  color={symbol.color}
                  size={iconSize}
                />
              </G>
            );
          })}
        </G>
      </Svg>
    </AnimatedTouchableOpacity>
  );
};

function getRoundedHexagonPath(size: number): string {
  const inset = size * 0.06;
  const radius = size * 0.5 - inset;
  const cornerRadius = size * 0.035;
  const center = size / 2;
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60) * (Math.PI / 180);
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  });

  return points
    .map((point, index) => {
      const previous = points[(index + points.length - 1) % points.length];
      const next = points[(index + 1) % points.length];
      const previousAngle = Math.atan2(previous.y - point.y, previous.x - point.x);
      const nextAngle = Math.atan2(next.y - point.y, next.x - point.x);
      const start = {
        x: point.x + Math.cos(previousAngle) * cornerRadius,
        y: point.y + Math.sin(previousAngle) * cornerRadius,
      };
      const end = {
        x: point.x + Math.cos(nextAngle) * cornerRadius,
        y: point.y + Math.sin(nextAngle) * cornerRadius,
      };

      return `${index === 0 ? "M" : "L"} ${start.x} ${start.y} Q ${point.x} ${point.y} ${end.x} ${end.y}`;
    })
    .join(" ")
    .concat(" Z");
}

export default HexagonCard;
