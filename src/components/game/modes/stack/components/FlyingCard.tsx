import HexagonCard from "@/components/HexagonCard";
import Animated from "react-native-reanimated";

import { stackModeStyles as styles } from "../stackMode.styles";

type FlyingCardProps = {
  animatedStyle?: any;
  card?: any | null;
  size: number;
};

const FlyingCard = ({ animatedStyle, card, size }: FlyingCardProps) => {
  if (!card || !animatedStyle) return null;

  return (
    <Animated.View style={[styles.flyingCard, animatedStyle]}>
      <HexagonCard card={card} size={size} style={styles.centeredCard} />
    </Animated.View>
  );
};

export default FlyingCard;
