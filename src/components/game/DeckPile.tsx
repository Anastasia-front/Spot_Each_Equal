import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const TOTAL_STACK_CARDS = 55;

type DeckPileProps = {
  size: number;
};

const DeckPile = ({ size }: DeckPileProps) => {
  const points = getFlatHexagonPoints(size);

  return (
    <View
      style={[
        styles.deckPile,
        {
          width: size,
          height: size,
          right: -size * 0.48,
          marginTop: -size / 2,
        },
      ]}
    >
      {[3, 2, 1, 0].map((offset) => (
        <Svg
          key={offset}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={[
            styles.deckPileLayer,
            {
              transform: [
                { translateX: -offset * 3 },
                { translateY: offset * 3 },
              ],
            },
          ]}
        >
          <Path
            d={points}
            fill={offset === 0 ? "#FFFDF8" : "#F1EFE8"}
            stroke="#D5D1C8"
            strokeWidth={2}
          />
        </Svg>
      ))}
      <View style={styles.deckBadge}>
        <Text style={styles.deckBadgeText}>{TOTAL_STACK_CARDS}</Text>
      </View>
    </View>
  );
};

function getFlatHexagonPoints(size: number) {
  const center = size / 2;
  const radius = size * 0.44;

  return Array.from({ length: 6 }, (_, i) => {
    const angle = i * 60 * (Math.PI / 180);
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  })
    .join(" ")
    .concat(" Z");
}

const styles = StyleSheet.create({
  deckPile: {
    position: "absolute",
    top: "50%",
    zIndex: 1,
  },
  deckPileLayer: {
    position: "absolute",
  },
  deckBadge: {
    position: "absolute",
    left: "31%",
    top: "40%",
    backgroundColor: "#667eea",
    borderRadius: 18,
    minWidth: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  deckBadgeText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "Inter-Bold",
  },
});

export default DeckPile;
