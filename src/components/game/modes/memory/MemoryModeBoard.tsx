import HexagonCard from "@/components/HexagonCard";
import { Text, View } from "react-native";

import { getSelectedSymbolsForCard } from "@/utils";
import { getModeCardSize } from "../../shared/responsive";
import { SelectedSymbol } from "../../shared/types";
import { memoryModeStyles as styles } from "./memoryMode.styles";

type MemoryModeBoardProps = {
  centerDeck: any[];
  disabled: boolean;
  foundStacks: any[][];
  memoryCards: any[];
  memorySeconds: number;
  memoryVisible: boolean;
  players: string[];
  selectedSymbols: SelectedSymbol[];
  onSymbolPress: (card: any, symbol: any, symbolIndex: number) => void;
};

const MemoryModeBoard = ({
  centerDeck,
  disabled,
  foundStacks,
  memoryCards,
  memorySeconds,
  memoryVisible,
  players,
  selectedSymbols,
  onSymbolPress,
}: MemoryModeBoardProps) => {
  const centerCard = centerDeck[0];
  const memoryCard = memoryCards[0];
  const centerSize = getModeCardSize({
    heightRatio: 0.23,
    max: 278,
    min: 180,
    widthRatio: 0.78,
  });
  const memorySize = getModeCardSize({
    heightRatio: 0.245,
    max: 292,
    min: 190,
    widthRatio: 0.84,
  });

  return (
    <View style={styles.board}>
      <ScoreRail players={players} stacks={foundStacks} />

      <View style={styles.timerRow}>
        <Text style={styles.timerText}>
          {memoryVisible && memorySeconds > 0
            ? `Remember: ${memorySeconds}s`
            : "Find it from memory"}
        </Text>
      </View>

      <View style={styles.cardsColumn}>
        {memoryCard && (
          <View style={styles.memoryCardSlot}>
            <Text style={styles.cardLabel}>{players[0] ?? "You"}</Text>
            <HexagonCard
              card={memoryCard}
              disabled={disabled || !memoryVisible}
              faceDown={!memoryVisible}
              selectedSymbols={getSelectedSymbolsForCard(
                selectedSymbols,
                memoryCard.id,
              )}
              size={memorySize}
              style={styles.centeredCard}
            />
          </View>
        )}

        {centerCard && (
          <View style={styles.centerCardSlot}>
            <HexagonCard
              card={centerCard}
              disabled={disabled || memorySeconds > 0}
              onSymbolPress={(symbol, index) =>
                onSymbolPress(centerCard, symbol, index)
              }
              selectedSymbols={getSelectedSymbolsForCard(
                selectedSymbols,
                centerCard.id,
              )}
              size={centerSize}
              style={styles.centeredCard}
            />
            <Text style={styles.centerDeckCount}>{centerDeck.length}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

type ScoreRailProps = {
  players: string[];
  stacks: any[][];
};

const ScoreRail = ({ players, stacks }: ScoreRailProps) => (
  <View style={styles.scoreRail}>
    {players.map((player, index) => (
      <View key={player} style={styles.scorePill}>
        <Text style={styles.scoreName} numberOfLines={1}>
          {player}
        </Text>
        <Text style={styles.scoreValue}>{stacks[index]?.length ?? 0}</Text>
      </View>
    ))}
  </View>
);

export default MemoryModeBoard;
