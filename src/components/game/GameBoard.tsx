import HexagonCard from "@/components/HexagonCard";
import { getCardPosition } from "@/utils";
import { View } from "react-native";
import Animated from "react-native-reanimated";

import DeckPile from "./DeckPile";
import { gameStyles as styles, screenHeight, screenWidth } from "./game.styles";
import { getSelectedSymbolsForCard, SelectedSymbol } from "./types";

type GameBoardProps = {
  cards: any[];
  cardsToMatch: number;
  cardSize: number;
  disabled: boolean;
  selectedSymbols: SelectedSymbol[];
  dealtCardAnimatedStyle: any;
  onSymbolPress: (card: any, symbol: any, symbolIndex: number) => void;
};

const GameBoard = ({
  cards,
  cardsToMatch,
  cardSize,
  disabled,
  selectedSymbols,
  dealtCardAnimatedStyle,
  onSymbolPress,
}: GameBoardProps) => (
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

export default GameBoard;
