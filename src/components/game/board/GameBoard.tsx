import HexagonCard from "@/components/HexagonCard";
import { getCardPosition } from "@/utils";
import { View } from "react-native";
import Animated from "react-native-reanimated";

import DuelModeBoard from "../modes/duel/DuelModeBoard";
import MemoryModeBoard from "../modes/memory/MemoryModeBoard";
import ResetModeBoard from "../modes/reset/ResetModeBoard";
import SmallPileModeBoard from "../modes/small-pile/SmallPileModeBoard";
import StackModeBoard from "../modes/stack/StackModeBoard";
import DeckPile from "../shared/DeckPile";
import {
  screenHeight,
  screenWidth,
  gameStyles as styles,
} from "../shared/game.styles";
import { getSelectedSymbolsForCard, SelectedSymbol } from "../shared/types";

type GameBoardProps = {
  cards: any[];
  cardsToMatch: number;
  cardSize: number;
  centerDeck?: any[];
  collectAnimatedStyle?: any;
  collectingCard?: any | null;
  collectingReceiverIndex?: number | null;
  disabled: boolean;
  foundStacks?: any[][];
  gameMode?: string | null;
  memoryCards?: any[];
  memorySeconds?: number;
  memoryVisible?: boolean;
  players?: string[];
  playerStacks?: any[][];
  selectedSymbols: SelectedSymbol[];
  dealtCardAnimatedStyle: any;
  onSymbolPress: (card: any, symbol: any, symbolIndex: number) => void;
};

const GameBoard = ({
  cards,
  cardsToMatch,
  cardSize,
  centerDeck = [],
  collectAnimatedStyle,
  collectingCard,
  collectingReceiverIndex,
  disabled,
  foundStacks = [],
  gameMode,
  memoryCards = [],
  memorySeconds = 0,
  memoryVisible = false,
  players = [],
  playerStacks = [],
  selectedSymbols,
  dealtCardAnimatedStyle,
  onSymbolPress,
}: GameBoardProps) => {
  const isStackMode = gameMode === "me" || gameMode === "you";
  const isMemoryMode = gameMode === "memo";
  const isResetMode = gameMode === "reset";
  const isDuelMode = gameMode === "duel";
  const isSmallPileMode = gameMode === "smallPile";

  if (isStackMode) {
    return (
      <View style={styles.gameArea}>
        <Animated.View style={[styles.cardsGrid, dealtCardAnimatedStyle]}>
          <StackModeBoard
            centerDeck={centerDeck}
            collectAnimatedStyle={collectAnimatedStyle}
            collectingCard={collectingCard}
            collectingReceiverIndex={collectingReceiverIndex}
            disabled={disabled}
            gameMode={gameMode}
            players={players}
            playerStacks={playerStacks}
            selectedSymbols={selectedSymbols}
            onSymbolPress={onSymbolPress}
          />
        </Animated.View>
      </View>
    );
  }

  if (isMemoryMode) {
    return (
      <View style={styles.gameArea}>
        <Animated.View style={[styles.cardsGrid, dealtCardAnimatedStyle]}>
          <MemoryModeBoard
            centerDeck={centerDeck}
            disabled={disabled}
            foundStacks={foundStacks}
            memoryCards={memoryCards}
            memorySeconds={memorySeconds}
            memoryVisible={memoryVisible}
            players={players}
            selectedSymbols={selectedSymbols}
            onSymbolPress={onSymbolPress}
          />
        </Animated.View>
      </View>
    );
  }

  if (isResetMode) {
    return (
      <View style={styles.gameArea}>
        <Animated.View style={[styles.cardsGrid, dealtCardAnimatedStyle]}>
          <ResetModeBoard
            centerDeck={centerDeck}
            disabled={disabled}
            players={players}
            playerStacks={playerStacks}
            selectedSymbols={selectedSymbols}
            onSymbolPress={onSymbolPress}
          />
        </Animated.View>
      </View>
    );
  }

  if (isDuelMode) {
    return (
      <View style={styles.gameArea}>
        <Animated.View style={[styles.cardsGrid, dealtCardAnimatedStyle]}>
          <DuelModeBoard
            disabled={disabled}
            foundStacks={foundStacks}
            players={players}
            playerStacks={playerStacks}
            selectedSymbols={selectedSymbols}
            onSymbolPress={onSymbolPress}
          />
        </Animated.View>
      </View>
    );
  }

  if (isSmallPileMode) {
    return (
      <View style={styles.gameArea}>
        <Animated.View style={[styles.cardsGrid, dealtCardAnimatedStyle]}>
          <SmallPileModeBoard
            cards={cards}
            disabled={disabled}
            foundStacks={foundStacks}
            players={players}
            selectedSymbols={selectedSymbols}
            onSymbolPress={onSymbolPress}
          />
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.gameArea}>
      <DeckPile size={cardSize * 0.74} />
      <Animated.View style={[styles.cardsGrid, dealtCardAnimatedStyle]}>
        {cardsToMatch === 2 ? (
          <View style={styles.twoCardsStack}>
            {cards.slice(0, cardsToMatch).map((card) => (
              <View key={card.id} style={styles.twoCardSlot}>
                <HexagonCard
                  card={card}
                  size={cardSize}
                  style={styles.centeredCard}
                  onSymbolPress={(symbol, index) =>
                    onSymbolPress(card, symbol, index)
                  }
                  selectedSymbols={getSelectedSymbolsForCard(
                    selectedSymbols,
                    card.id,
                  )}
                  disabled={disabled}
                />
              </View>
            ))}
          </View>
        ) : (
          cards.slice(0, cardsToMatch).map((card, index) => {
            const { x, y } = getCardPosition(
              index,
              cardsToMatch,
              Math.min(screenWidth, screenHeight) * 0.23,
              screenWidth / 2,
              Math.min(screenHeight * 0.38, 330),
            );

            return (
              <HexagonCard
                key={card.id}
                card={card}
                size={cardSize}
                style={{ position: "absolute", left: x, top: y }}
                onSymbolPress={(symbol, symbolIndex) =>
                  onSymbolPress(card, symbol, symbolIndex)
                }
                selectedSymbols={getSelectedSymbolsForCard(
                  selectedSymbols,
                  card.id,
                )}
                disabled={disabled}
              />
            );
          })
        )}
      </Animated.View>
    </View>
  );
};

export default GameBoard;
