import HexagonCard from "@/components/HexagonCard";
import { useMemo } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";

import { gameCanvasHeight } from "../../shared/game.styles";
import { getModeCardSize, screenWidth } from "../../shared/responsive";
import { SelectedSymbol } from "../../shared/types";
import { smallPileModeStyles as styles } from "./smallPileMode.styles";

type SmallPileModeBoardProps = {
  cards: any[];
  disabled: boolean;
  foundStacks: any[][];
  players: string[];
  selectedSymbols: SelectedSymbol[];
  onSymbolPress: (card: any, symbol: any, symbolIndex: number) => void;
};

const SmallPileModeBoard = ({
  cards,
  disabled,
  foundStacks,
  players,
  selectedSymbols,
  onSymbolPress,
}: SmallPileModeBoardProps) => {
  const cardSize = getModeCardSize({
    heightRatio: 0.16,
    max: 160,
    min: 96,
    widthRatio: 0.34,
  });
  const selectedSymbolsByCard = useMemo(
    () =>
      selectedSymbols.reduce<Record<string, Record<number, SelectedSymbol["status"]>>>(
        (acc, selected) => {
          acc[selected.cardId] = acc[selected.cardId] ?? {};
          acc[selected.cardId][selected.symbolIndex] = selected.status;
          return acc;
        },
        {},
      ),
    [selectedSymbols],
  );
  const cardStylesById = useMemo(
    () =>
      cards.reduce<Record<string, StyleProp<ViewStyle>>>((acc, card, index) => {
        const position = getScatterPosition(card.id, index, cardSize);

        acc[card.id] = [
          styles.scatteredCard,
          {
            left: position.left,
            top: position.top,
            transform: [{ rotate: `${position.rotation}deg` }],
            zIndex: position.zIndex,
          },
        ];

        return acc;
      }, {}),
    [cards, cardSize],
  );

  return (
    <View style={styles.board}>
      <ScoreRail foundStacks={foundStacks} players={players} />
      <View style={styles.pileArea}>
        {cards.map((card) => (
            <HexagonCard
              key={card.id}
              card={card}
              disabled={disabled}
              onSymbolPress={(symbol, symbolIndex) =>
                onSymbolPress(card, symbol, symbolIndex)
              }
              selectedSymbols={selectedSymbolsByCard[card.id]}
              size={cardSize}
              style={cardStylesById[card.id]}
            />
        ))}
      </View>
    </View>
  );
};

const getScatterPosition = (cardId: string, index: number, cardSize: number) => {
  const pileWidth = screenWidth - 98;
  const pileHeight = gameCanvasHeight - 18;
  const seed = getCardSeed(cardId, index);
  const depthBias = index / 56;
  const edgePull = depthBias < 0.45 ? cardSize * 0.28 : cardSize * 0.08;
  const left =
    randomFromSeed(seed) * (pileWidth - cardSize + edgePull * 2) - edgePull;
  const top =
    randomFromSeed(seed + 17) * (pileHeight - cardSize + edgePull * 2) -
    edgePull;

  return {
    left,
    top,
    rotation: randomFromSeed(seed + 31) * 86 - 43,
    zIndex: Math.round(randomFromSeed(seed + 47) * 1000),
  };
};

const getCardSeed = (cardId: string, index: number) =>
  cardId.split("").reduce((sum, char) => sum + char.charCodeAt(0), index * 97);

const randomFromSeed = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

type ScoreRailProps = {
  foundStacks: any[][];
  players: string[];
};

const ScoreRail = ({ foundStacks, players }: ScoreRailProps) => (
  <View style={styles.scoreRail}>
    {players.map((player, index) => (
      <View key={player} style={styles.scorePill}>
        <Text style={styles.scoreName} numberOfLines={1}>
          {player}
        </Text>
        <Text style={styles.scoreValue}>{foundStacks[index]?.length ?? 0}</Text>
      </View>
    ))}
  </View>
);

export default SmallPileModeBoard;
