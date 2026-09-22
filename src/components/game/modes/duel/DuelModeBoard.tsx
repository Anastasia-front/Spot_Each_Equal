import HexagonCard from "@/components/HexagonCard";
import { Text, View } from "react-native";

import { getSelectedSymbolsForCard } from "@/utils";
import { getModeCardSize } from "../../shared/responsive";
import { SelectedSymbol } from "../../shared/types";
import { duelModeStyles as styles } from "./duelMode.styles";

type DuelModeBoardProps = {
  disabled: boolean;
  foundStacks: any[][];
  players: string[];
  playerStacks: any[][];
  selectedSymbols: SelectedSymbol[];
  onSymbolPress: (card: any, symbol: any, symbolIndex: number) => void;
};

const DuelModeBoard = ({
  disabled,
  foundStacks,
  players,
  playerStacks,
  selectedSymbols,
  onSymbolPress,
}: DuelModeBoardProps) => {
  const cardSize = getModeCardSize({
    heightRatio: 0.255,
    max: 292,
    min: 190,
    widthRatio: 0.82,
  });
  const localCard = playerStacks[0]?.[playerStacks[0].length - 1];
  const opponentCard = playerStacks[1]?.[playerStacks[1].length - 1];

  return (
    <View style={styles.board}>
      <DuelScoreRail
        foundStacks={foundStacks}
        players={players}
        playerStacks={playerStacks}
      />
      <View style={styles.cardsColumn}>
        {opponentCard && (
          <DuelCard
            card={opponentCard}
            disabled={disabled}
            label={`${players[1] ?? "Opponent"} · ${playerStacks[1]?.length ?? 0}`}
            selectedSymbols={selectedSymbols}
            size={cardSize}
            onSymbolPress={onSymbolPress}
          />
        )}

        {localCard && (
          <DuelCard
            card={localCard}
            disabled={disabled}
            label={`${players[0] ?? "You"} · ${playerStacks[0]?.length ?? 0}`}
            selectedSymbols={selectedSymbols}
            size={cardSize}
            onSymbolPress={onSymbolPress}
          />
        )}
      </View>
    </View>
  );
};

type DuelCardProps = {
  card: any;
  disabled: boolean;
  label: string;
  selectedSymbols: SelectedSymbol[];
  size: number;
  onSymbolPress: (card: any, symbol: any, symbolIndex: number) => void;
};

const DuelCard = ({
  card,
  disabled,
  label,
  selectedSymbols,
  size,
  onSymbolPress,
}: DuelCardProps) => (
  <View style={styles.cardSlot}>
    <Text style={styles.cardLabel}>{label}</Text>
    <HexagonCard
      card={card}
      disabled={disabled}
      onSymbolPress={(symbol, index) => onSymbolPress(card, symbol, index)}
      selectedSymbols={getSelectedSymbolsForCard(selectedSymbols, card.id)}
      size={size}
      style={styles.centeredCard}
    />
  </View>
);

type DuelScoreRailProps = {
  foundStacks: any[][];
  players: string[];
  playerStacks: any[][];
};

const DuelScoreRail = ({
  foundStacks,
  players,
  playerStacks,
}: DuelScoreRailProps) => (
  <View style={styles.scoreRail}>
    {players.slice(0, 2).map((player, index) => (
      <View key={player} style={styles.scorePill}>
        <Text style={styles.scoreName} numberOfLines={1}>
          {player}
        </Text>
        <Text style={styles.scoreValue}>{foundStacks[index]?.length ?? 0}</Text>
        <Text style={styles.remainingValue}>
          deck {playerStacks[index]?.length ?? 0}
        </Text>
      </View>
    ))}
  </View>
);

export default DuelModeBoard;
