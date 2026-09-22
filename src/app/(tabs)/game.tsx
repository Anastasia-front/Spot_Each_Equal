import { getGameResults } from "@/components/game/results/gameResults";
import { getGameModes } from "@/constants";
import { useGame } from "@/context/GameContext";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScoresScreen = () => {
  const { t } = useTranslation();
  const { state } = useGame();
  const gameModes = getGameModes(t);
  const [selectedMode, setSelectedMode] = useState(
    state.gameMode ?? gameModes[0]?.key ?? "me",
  );

  useEffect(() => {
    if (state.gameMode) setSelectedMode(state.gameMode);
  }, [state.gameMode]);

  const scoreRows = useMemo(() => {
    if (state.gameMode !== selectedMode || !state.players.length) return [];

    return getGameResults(
      state.gameMode,
      state.players,
      state.playerStacks,
      state.foundStacks,
      state.finishedPlayerIndexes,
      state.initialPlayerCardCount,
    )
      .players.map((player, index) => ({ ...player, index }))
      .sort((a, b) => b.score - a.score);
  }, [
    selectedMode,
    state.finishedPlayerIndexes,
    state.foundStacks,
    state.gameMode,
    state.initialPlayerCardCount,
    state.players,
    state.playerStacks,
  ]);

  const selectedModeTitle =
    gameModes.find((mode) => mode.key === selectedMode)?.title ?? selectedMode;

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t("scores.title")}</Text>
          <Text style={styles.subtitle}>{t("scores.subtitle")}</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.modeTabsScroller}
          contentContainerStyle={styles.modeTabs}
        >
          {gameModes.map((mode) => {
            const selected = selectedMode === mode.key;

            return (
              <TouchableOpacity
                key={mode.key}
                style={[styles.modeTab, selected && styles.modeTabActive]}
                onPress={() => setSelectedMode(mode.key)}
              >
                <Text
                  style={[
                    styles.modeTabText,
                    selected && styles.modeTabTextActive,
                  ]}
                >
                  {mode.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.board}>
          <Text style={styles.boardTitle}>{selectedModeTitle}</Text>

          {scoreRows.length ? (
            scoreRows.map((player, index) => (
              <View key={`${player.name}-${player.index}`} style={styles.row}>
                <View style={styles.placeBadge}>
                  <Text style={styles.placeText}>{index + 1}</Text>
                </View>
                <Text style={styles.playerName} numberOfLines={1}>
                  {player.name}
                </Text>
                <Text style={styles.scoreValue}>
                  {player.score} {t("results.points")}
                </Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>{t("scores.emptyTitle")}</Text>
              <Text style={styles.emptyText}>{t("scores.emptyText")}</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F0F4F8",
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 18,
  },
  title: {
    color: "#2C3E50",
    fontFamily: "Inter-Bold",
    fontSize: 32,
  },
  subtitle: {
    color: "#6C7784",
    fontFamily: "Inter-Regular",
    fontSize: 15,
    marginTop: 6,
  },
  modeTabs: {
    gap: 8,
    paddingBottom: 18,
  },
  modeTabsScroller: {
    flexGrow: 0,
    flexShrink: 0,
    maxHeight: 56,
  },
  modeTab: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E1E8ED",
    borderRadius: 18,
    borderWidth: 1,
    height: 38,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  modeTabActive: {
    backgroundColor: "#667eea",
    borderColor: "#667eea",
  },
  modeTabText: {
    color: "#6C7784",
    fontFamily: "Inter-SemiBold",
    fontSize: 13,
  },
  modeTabTextActive: {
    color: "#FFFFFF",
  },
  board: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E1E8ED",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: 16,
  },
  boardTitle: {
    color: "#2C3E50",
    fontFamily: "Inter-Bold",
    fontSize: 20,
    marginBottom: 12,
  },
  row: {
    alignItems: "center",
    borderBottomColor: "#EEF2F6",
    borderBottomWidth: 1,
    flexDirection: "row",
    minHeight: 58,
  },
  placeBadge: {
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 15,
    height: 30,
    justifyContent: "center",
    marginRight: 12,
    width: 30,
  },
  placeText: {
    color: "#667eea",
    fontFamily: "Inter-Bold",
    fontSize: 13,
  },
  playerName: {
    color: "#2C3E50",
    flex: 1,
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  scoreValue: {
    color: "#2C3E50",
    fontFamily: "Inter-Bold",
    fontSize: 15,
  },
  emptyState: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: "#2C3E50",
    fontFamily: "Inter-Bold",
    fontSize: 18,
    textAlign: "center",
  },
  emptyText: {
    color: "#6C7784",
    fontFamily: "Inter-Regular",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    textAlign: "center",
  },
});

export default ScoresScreen;
