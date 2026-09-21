import { View } from "react-native";

import { SelectedSymbol } from "../../../../shared/types";
import PlayerCard from "../../../stack/components/PlayerCard";
import { stackModeStyles as styles } from "../../../stack/stackMode.styles";
import { StackCardPressHandler } from "../../../stack/types/stackMode.types";

type OpponentCardsProps = {
  disabled: boolean;
  players: string[];
  selectedSymbols: SelectedSymbol[];
  size: number;
  stacks: any[][];
  onSymbolPress: StackCardPressHandler;
};

const OpponentCards = ({
  disabled,
  players,
  selectedSymbols,
  size,
  stacks,
  onSymbolPress,
}: OpponentCardsProps) => {
  const opponentCards = stacks
    .map((stack, rawIndex) => ({
      card: stack[stack.length - 1],
      index: rawIndex + 1,
      stack,
    }))
    .filter(({ card }) => Boolean(card));

  if (opponentCards.length === 3) {
    return (
      <View style={styles.opponentTriangle}>
        <View style={styles.opponentTriangleTopRow}>
          {opponentCards.slice(0, 2).map(({ card, index, stack }) => (
            <PlayerCard
              key={players[index] ?? index}
              card={card}
              disabled={disabled}
              label={`${players[index] ?? `Player ${index + 1}`} · ${stack.length}`}
              selectedSymbols={selectedSymbols}
              size={size}
              onSymbolPress={onSymbolPress}
            />
          ))}
        </View>
        <View style={styles.opponentTriangleBottomRow}>
          <PlayerCard
            card={opponentCards[2].card}
            disabled={disabled}
            label={`${players[opponentCards[2].index] ?? `Player ${opponentCards[2].index + 1}`} · ${opponentCards[2].stack.length}`}
            selectedSymbols={selectedSymbols}
            size={size}
            onSymbolPress={onSymbolPress}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.opponentRow}>
      {opponentCards.map(({ card, index, stack }) => (
        <PlayerCard
          key={players[index] ?? index}
          card={card}
          disabled={disabled}
          label={`${players[index] ?? `Player ${index + 1}`} · ${stack.length}`}
          selectedSymbols={selectedSymbols}
          size={size}
          onSymbolPress={onSymbolPress}
        />
      ))}
    </View>
  );
};

export default OpponentCards;
