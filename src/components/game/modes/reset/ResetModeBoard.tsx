import HexagonCard from "@/components/HexagonCard";
import { Text, View } from "react-native";

import { getSelectedSymbolsForCard } from "@/utils";
import { getModeCardSize } from "../../shared/responsive";
import { SelectedSymbol } from "../../shared/types";
import { resetModeStyles as styles } from "./resetMode.styles";

type ResetModeBoardProps = {
  centerDeck: any[];
  disabled: boolean;
  players: string[];
  playerStacks: any[][];
  selectedSymbols: SelectedSymbol[];
  onSymbolPress: (card: any, symbol: any, symbolIndex: number) => void;
};

const ResetModeBoard = ({
  centerDeck,
  disabled,
  players,
  playerStacks,
  selectedSymbols,
  onSymbolPress,
}: ResetModeBoardProps) => {
  const centerCard = centerDeck[0];
  const localStack = playerStacks[0] ?? [];
  const localCard = localStack[localStack.length - 1];
  const cardSize = getModeCardSize({
    heightRatio: 0.265,
    max: 330,
    min: 205,
    widthRatio: 0.92,
  });

  return (
    <View style={styles.board}>
      <ScoreRail players={players} stacks={playerStacks} />
      <View style={styles.cardsColumn}>
        {centerCard && (
          <CardWithCounter
            card={centerCard}
            count={centerDeck.length}
            disabled={disabled}
            selectedSymbols={selectedSymbols}
            size={cardSize}
            onSymbolPress={onSymbolPress}
          />
        )}

        {localCard && (
          <View style={styles.localCardSlot}>
            <Text style={styles.localLabel}>
              {players[0] ?? "You"} · {localStack.length}
            </Text>
            <HexagonCard
              card={localCard}
              disabled={disabled}
              onSymbolPress={(symbol, index) =>
                onSymbolPress(localCard, symbol, index)
              }
              selectedSymbols={getSelectedSymbolsForCard(
                selectedSymbols,
                localCard.id,
              )}
              size={cardSize}
              style={styles.centeredCard}
            />
          </View>
        )}
      </View>
    </View>
  );
};

type CardProps = {
  card: any;
  disabled: boolean;
  selectedSymbols: SelectedSymbol[];
  size: number;
  onSymbolPress: (card: any, symbol: any, symbolIndex: number) => void;
};

const CardWithCounter = ({
  card,
  count,
  disabled,
  selectedSymbols,
  size,
  onSymbolPress,
}: CardProps & { count: number }) => (
  <View style={styles.cardSlot}>
    <HexagonCard
      card={card}
      disabled={disabled}
      onSymbolPress={(symbol, index) => onSymbolPress(card, symbol, index)}
      selectedSymbols={getSelectedSymbolsForCard(selectedSymbols, card.id)}
      size={size}
      style={styles.centeredCard}
    />
    <Text style={styles.centerDeckCount}>{count}</Text>
  </View>
);

type ScoreRailProps = {
  players: string[];
  stacks: any[][];
};

const ScoreRail = ({ players, stacks }: ScoreRailProps) => (
  <View style={styles.scoreRail}>
    {stacks.map((stack, index) => (
      <View key={players[index] ?? index} style={styles.scorePill}>
        <Text style={styles.scoreName} numberOfLines={1}>
          {players[index] ?? `Player ${index + 1}`}
        </Text>
        <Text style={styles.scoreValue}>{stack.length}</Text>
      </View>
    ))}
  </View>
);

export default ResetModeBoard;
