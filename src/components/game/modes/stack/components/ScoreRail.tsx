import { Text, View } from "react-native";

import { stackModeStyles as styles } from "../stackMode.styles";

type ScoreRailProps = {
  players: string[];
  stacks: any[][];
};

const ScoreRail = ({ players, stacks }: ScoreRailProps) => (
  <View style={styles.scoreRail}>
    {stacks.map((stack, index) => (
      <View key={players[index] ?? index} style={styles.scorePill}>
        <Text style={styles.scoreName} numberOfLines={1}>
          {players[index] ?? `Player ${index + 1}`}
        </Text>
        <Text style={styles.scoreValue}>{Math.max(stack.length - 1, 0)}</Text>
      </View>
    ))}
  </View>
);

export default ScoreRail;
