import HexagonCard from "@/components/HexagonCard";
import { Text, View } from "react-native";

import {
  getSelectedSymbolsForCard,
  SelectedSymbol,
} from "../../../shared/types";
import { stackModeStyles as styles } from "../stackMode.styles";
import { StackCardPressHandler } from "../types/stackMode.types";

type CardWithCounterProps = {
  card: any;
  count: number;
  disabled: boolean;
  selectedSymbols: SelectedSymbol[];
  size: number;
  onSymbolPress: StackCardPressHandler;
};

const CardWithCounter = ({
  card,
  count,
  disabled,
  selectedSymbols,
  size,
  onSymbolPress,
}: CardWithCounterProps) => (
  <View style={styles.cardSlot}>
    <HexagonCard
      card={card}
      size={size}
      style={styles.centeredCard}
      onSymbolPress={(symbol, index) => onSymbolPress(card, symbol, index)}
      selectedSymbols={getSelectedSymbolsForCard(selectedSymbols, card.id)}
      disabled={disabled}
    />
    <Text style={styles.centerDeckCount}>{count}</Text>
  </View>
);

export default CardWithCounter;
