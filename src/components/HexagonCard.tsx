import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Svg, { G, Polygon } from "react-native-svg";
import IconRenderer from "./IconRenderer";

const { width: screenWidth } = Dimensions.get("window");

interface HexagonCardProps {
  card: any;
  size?: number;
  onPress?: () => void;
  highlighted?: boolean;
  disabled?: boolean;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const HexagonCard: React.FC<HexagonCardProps> = ({
  card,
  size = screenWidth * 0.4,
  onPress,
  highlighted = false,
  disabled = false,
}) => {
  const hexagonPoints = getHexagonPoints(size);
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
        animatedStyle,
      ]}
    >
      <Svg width={size} height={size}>
        {/* Hexagon shadow */}
        <Polygon
          points={hexagonPoints}
          fill="#00000015"
          transform={`translate(3, 3)`}
        />

        {/* Hexagon background */}
        <Polygon
          points={hexagonPoints}
          fill={card.isColorCard ? "#FFFFFF" : "#F8F9FA"}
          stroke={highlighted ? "#FF6B6B" : "#E1E8ED"}
          strokeWidth={highlighted ? 4 : 2}
          opacity={disabled ? 0.6 : 1}
        />

        {/* Highlighted glow effect */}
        {highlighted && (
          <Polygon
            points={hexagonPoints}
            fill="none"
            stroke="#FF6B6B40"
            strokeWidth={8}
          />
        )}

        {/* Render symbols */}
        <G>
          {card.symbols.map((symbol: any, index: number) => {
            const x = centerX + symbol.position.x * (size * 0.3);
            const y = centerY + symbol.position.y * (size * 0.3);

            return (
              <G key={index} transform={`translate(${x}, ${y})`}>
                <IconRenderer
                  icon={symbol.icon}
                  color={symbol.color}
                  size={size * 0.08 * symbol.size}
                  rotation={symbol.rotation}
                />
              </G>
            );
          })}
        </G>
      </Svg>
    </AnimatedTouchableOpacity>
  );
};

function getHexagonPoints(size: number): string {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.45;
  const points = [];

  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 - 90) * (Math.PI / 180);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }

  return points.join(" ");
}

export default HexagonCard;
