import { View } from "react-native";

import { getModeCardSize } from "../../../shared/responsive";
import CardWithCounter from "../components/CardWithCounter";
import FlyingCard from "../components/FlyingCard";
import PlayerCard from "../components/PlayerCard";
import ScoreRail from "../components/ScoreRail";
import { stackModeStyles as styles } from "../stackMode.styles";
import { StackBoardProps } from "../types/stackMode.types";

const MeModeBoard = ({
  centerDeck,
  collectAnimatedStyle,
  collectingCard,
  disabled,
  players,
  playerStacks,
  selectedSymbols,
  onSymbolPress,
}: StackBoardProps) => {
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
    <View style={styles.stackBoard}>
      <ScoreRail players={players} stacks={playerStacks} />
      <View style={styles.meCardsColumn}>
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
          <PlayerCard
            card={localCard}
            disabled={disabled}
            label={players[0] ?? "You"}
            selectedSymbols={selectedSymbols}
            size={cardSize}
            onSymbolPress={onSymbolPress}
          />
        )}
      </View>
      <FlyingCard
        animatedStyle={collectAnimatedStyle}
        card={collectingCard}
        size={cardSize}
      />
    </View>
  );
};

export default MeModeBoard;
