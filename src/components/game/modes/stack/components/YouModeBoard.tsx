import HexagonCard from "@/components/HexagonCard";
import { Text, View } from "react-native";

import { getSelectedSymbolsForCard } from "@/utils";
import { getModeCardSize, vh, vw } from "../../../shared/responsive";
import { stackModeStyles as styles } from "../stackMode.styles";
import { StackBoardProps } from "../types/stackMode.types";
import OpponentCards from "../you/components/OpponentCards";
import CardWithCounter from "./CardWithCounter";
import FlyingCard from "./FlyingCard";

const YouModeBoard = ({
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
  const opponentStacks = playerStacks.slice(1, 4);
  const sharedCardSize = getYouModeCardSize(opponentStacks.length);
  const localSize = Math.min(vw(21), vh(8.2), 92);

  return (
    <View style={styles.youBoard}>
      <View style={styles.youTopRow}>
        {centerCard && (
          <CardWithCounter
            card={centerCard}
            count={centerDeck.length}
            disabled={disabled}
            selectedSymbols={selectedSymbols}
            size={sharedCardSize}
            onSymbolPress={onSymbolPress}
          />
        )}

        {localCard && (
          <View style={styles.tinyLocalStack}>
            <Text style={styles.tinyLocalLabel}>{players[0] ?? "You"}</Text>
            <HexagonCard
              card={localCard}
              disabled={disabled}
              faceDown={false}
              selectedSymbols={getSelectedSymbolsForCard(
                selectedSymbols,
                localCard.id,
              )}
              size={localSize}
              style={styles.centeredCard}
            />
            <Text style={styles.tinyLocalScore}>{localStack.length}</Text>
          </View>
        )}
      </View>

      <OpponentCards
        disabled={disabled}
        players={players}
        selectedSymbols={selectedSymbols}
        size={sharedCardSize}
        stacks={opponentStacks}
        onSymbolPress={onSymbolPress}
      />
      <FlyingCard
        animatedStyle={collectAnimatedStyle}
        card={collectingCard}
        size={sharedCardSize}
      />
    </View>
  );
};

const getYouModeCardSize = (opponentCount: number) => {
  if (opponentCount <= 1) {
    return getModeCardSize({
      heightRatio: 0.245,
      max: 250,
      min: 170,
      rail: false,
      widthRatio: 0.54,
    });
  }
  if (opponentCount === 2) {
    return getModeCardSize({
      heightRatio: 0.19,
      max: 205,
      min: 138,
      rail: false,
      widthRatio: 0.42,
    });
  }
  return getModeCardSize({
    heightRatio: 0.16,
    max: 176,
    min: 112,
    rail: false,
    widthRatio: 0.34,
  });
};

export default YouModeBoard;
