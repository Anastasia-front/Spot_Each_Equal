import HexagonCard from "@/components/HexagonCard";
import { Text, View } from "react-native";

import { getSelectedSymbolsForCard } from "@/utils";
import { SelectedSymbol } from "../../../shared/types";
import { stackModeStyles as styles } from "../stackMode.styles";
import { StackCardPressHandler } from "../types/stackMode.types";

type PlayerCardProps = {
  card: any;
  disabled: boolean;
  label: string;
  selectedSymbols: SelectedSymbol[];
  size: number;
  onSymbolPress: StackCardPressHandler;
};

const PlayerCard = ({
  card,
  disabled,
  label,
  selectedSymbols,
  size,
  onSymbolPress,
}: PlayerCardProps) => (
  <View style={styles.playerStack}>
    <Text style={styles.playerStackLabel}>{label}</Text>
    <HexagonCard
      card={card}
      size={size}
      style={styles.centeredCard}
      onSymbolPress={(symbol, index) => onSymbolPress(card, symbol, index)}
      selectedSymbols={getSelectedSymbolsForCard(selectedSymbols, card.id)}
      disabled={disabled}
    />
  </View>
);

export default PlayerCard;
