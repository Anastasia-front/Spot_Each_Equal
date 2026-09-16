import HexagonCard from "@/components/HexagonCard";
import { useGame } from "@/context/GameContext";
import { getCardPosition, getCardSize } from "@/utils";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Pause, Play, RotateCcw } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const gameCanvasHeight = screenHeight * 0.64;
const TOTAL_STACK_CARDS = 55;

type SelectedSymbol = {
  cardId: string;
  symbolIndex: number;
  icon: string;
  status: "selected" | "error" | "success";
};

const getSelectedSymbolsForCard = (
  selectedSymbols: SelectedSymbol[],
  cardId: string,
) =>
  selectedSymbols
    .filter((selected) => selected.cardId === cardId)
    .reduce<Record<number, SelectedSymbol["status"]>>((acc, selected) => {
      acc[selected.symbolIndex] = selected.status;
      return acc;
    }, {});

const DeckPile = ({ size }: { size: number }) => {
  const points = getFlatHexagonPoints(size);

  return (
    <View
      style={[
        styles.deckPile,
        {
          width: size,
          height: size,
          right: -size * 0.48,
          marginTop: -size / 2,
        },
      ]}
    >
      {[3, 2, 1, 0].map((offset) => (
        <Svg
          key={offset}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={[
            styles.deckPileLayer,
            {
              transform: [
                { translateX: -offset * 3 },
                { translateY: offset * 3 },
              ],
            },
          ]}
        >
          <Path
            d={points}
            fill={offset === 0 ? "#FFFDF8" : "#F1EFE8"}
            stroke="#D5D1C8"
            strokeWidth={2}
          />
        </Svg>
      ))}
      <View style={styles.deckBadge}>
        <Text style={styles.deckBadgeText}>{TOTAL_STACK_CARDS}</Text>
      </View>
    </View>
  );
};

function getFlatHexagonPoints(size: number) {
  const center = size / 2;
  const radius = size * 0.44;

  return Array.from({ length: 6 }, (_, i) => {
    const angle = i * 60 * (Math.PI / 180);
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  })
    .join(" ")
    .concat(" Z");
}

const GameScreen = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useGame();
  const { gameMode: rawGameMode } = useLocalSearchParams();
  const gameMode = Array.isArray(rawGameMode) ? rawGameMode[0] : rawGameMode;

  const [selectedSymbols, setSelectedSymbols] = useState<SelectedSymbol[]>([]);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedSymbol, setMatchedSymbol] = useState<string | null>(null);

  const cardsToMatch = state.cardsToMatch || 2;

  // Animation values
  const matchScale = useSharedValue(0);
  const dealProgress = useSharedValue(1);

  useEffect(() => {
    if (gameMode) {
      dispatch({ type: "SET_GAME_MODE", payload: gameMode });
      dispatch({ type: "SET_PLAYERS", payload: ["Player 1", "Player 2"] });
      dispatch({ type: "START_GAME" });
    }
  }, [gameMode]);

  useEffect(() => {
    if (!state.cards.length) return;

    dealProgress.value = 0;
    dealProgress.value = withTiming(1, {
      duration: 420,
      easing: Easing.out(Easing.cubic),
    });
  }, [state.cards[0]?.id, state.cards[1]?.id]);

  const triggerHapticFeedback = () => {
    if (Platform.OS !== "web") {
      console.log("Haptic feedback triggered");
    }
  };

  const handleSymbolPress = (card: any, symbol: any, symbolIndex: number) => {
    if (state.gamePaused || state.gameOver) return;
    if (selectedSymbols.some((selected) => selected.status !== "selected")) {
      return;
    }

    triggerHapticFeedback();

    const currentSelection: SelectedSymbol = {
      cardId: card.id,
      symbolIndex,
      icon: symbol.icon,
      status: "selected",
    };
    const previousSelection = selectedSymbols[0];

    if (!previousSelection || previousSelection.cardId === card.id) {
      setSelectedSymbols([currentSelection]);
      return;
    }

    const isMatch = previousSelection.icon === symbol.icon;
    const status = isMatch ? "success" : "error";
    const resolvedSelection: SelectedSymbol[] = [
      { ...previousSelection, status },
      { ...currentSelection, status },
    ];

    setSelectedSymbols(resolvedSelection);

    if (!isMatch) {
      setTimeout(() => {
        setSelectedSymbols([]);
      }, 1000);
      return;
    }

    setMatchedSymbol(symbol.icon);
    setShowMatch(true);
    matchScale.value = withSpring(1);

    setTimeout(() => {
      dispatch({
        type: "MATCH_FOUND",
        payload: {
          cards: state.cards.slice(0, cardsToMatch),
          symbol: symbol.icon,
        },
      });
      setShowMatch(false);
      setSelectedSymbols([]);
      setMatchedSymbol(null);
      matchScale.value = 0;
      dispatch({ type: "CLEAR_MATCH" });
    }, 1000);
  };

  const handleNewGame = () => {
    dispatch({ type: "RESET_GAME" });
    if (gameMode) {
      dispatch({ type: "SET_GAME_MODE", payload: gameMode });
      dispatch({ type: "SET_PLAYERS", payload: ["Player 1", "Player 2"] });
      dispatch({ type: "START_GAME" });
    }
    setSelectedSymbols([]);
    setShowMatch(false);
    setMatchedSymbol(null);
    matchScale.value = 0;
  };

  const handlePauseToggle = () => {
    if (state.gamePaused) {
      dispatch({ type: "RESUME_GAME" });
    } else {
      dispatch({ type: "PAUSE_GAME" });
    }
  };

  const matchAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: matchScale.value }],
    opacity: matchScale.value,
  }));

  const dealtCardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: dealProgress.value,
    transform: [
      { translateX: (1 - dealProgress.value) * screenWidth * 0.32 },
      { scale: 0.94 + dealProgress.value * 0.06 },
    ],
  }));

  const cardSize =
    cardsToMatch === 2
      ? Math.min(screenWidth * 0.82, gameCanvasHeight / 2 - 22)
      : getCardSize(cardsToMatch, screenWidth);

  if (!state.cards.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t("loading")}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color="#667eea" />
            <Text style={styles.headerButtonText}>{t("buttons.back")}</Text>
          </TouchableOpacity>

          <Text style={styles.gameModeTitle}>{t(`gameModes.${gameMode}`)}</Text>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handlePauseToggle}
            >
              {state.gamePaused ? (
                <Play size={20} color="#667eea" />
              ) : (
                <Pause size={20} color="#667eea" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleNewGame}
            >
              <RotateCcw size={20} color="#667eea" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Match notification */}
        {showMatch && (
          <Animated.View style={[styles.matchNotification, matchAnimatedStyle]}>
            <Text style={styles.matchText}>{t("foundMatch")}</Text>
            <Text style={styles.matchSymbol}>
              {t("symbolLabel")}: {matchedSymbol}
            </Text>
          </Animated.View>
        )}

        {/* Pause overlay */}
        {state.gamePaused && (
          <View style={styles.pauseOverlay}>
            <Text style={styles.pauseText}>{t("gamePaused")}</Text>
            <TouchableOpacity
              style={styles.resumeButton}
              onPress={handlePauseToggle}
            >
              <Play size={24} color="#FFFFFF" />
              <Text style={styles.resumeButtonText}>{t("buttons.resume")}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Game area */}
        <View style={styles.gameArea}>
          <DeckPile size={cardSize * 0.74} />
          <Animated.View style={[styles.cardsGrid, dealtCardAnimatedStyle]}>
            {cardsToMatch === 2 ? (
              <View style={styles.twoCardsStack}>
                {state.cards.slice(0, cardsToMatch).map((card: any) => (
                  <View key={card.id} style={styles.twoCardSlot}>
                    <HexagonCard
                      card={card}
                      size={cardSize}
                      style={styles.centeredCard}
                      onSymbolPress={(symbol, symbolIndex) =>
                        handleSymbolPress(card, symbol, symbolIndex)
                      }
                      selectedSymbols={getSelectedSymbolsForCard(
                        selectedSymbols,
                        card.id,
                      )}
                      disabled={state.gamePaused}
                    />
                  </View>
                ))}
              </View>
            ) : (
              state.cards.slice(0, cardsToMatch).map((card: any, index) => {
                const visibleCards = cardsToMatch;

                const { x, y } = getCardPosition(
                  index,
                  visibleCards,
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
                      handleSymbolPress(card, symbol, symbolIndex)
                    }
                    selectedSymbols={getSelectedSymbolsForCard(
                      selectedSymbols,
                      card.id,
                    )}
                    disabled={state.gamePaused}
                  />
                );
              })
            )}
          </Animated.View>
        </View>

        {/* Instructions */}
        <View style={styles.instructions}>
          <Text style={styles.instructionsText}>
            {t("instructions.findSymbol", { count: cardsToMatch })}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
    color: "#666",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#F8F9FF",
    borderRadius: 20,
    marginHorizontal: 4,
  },
  headerButtonText: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: "#667eea",
    marginLeft: 6,
  },
  headerActions: {
    flexDirection: "row",
  },
  gameModeTitle: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "#2C3E50",
  },
  matchNotification: {
    backgroundColor: "#4ECDC4",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  matchText: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  matchSymbol: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
    opacity: 0.9,
  },
  pauseOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  pauseText: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  resumeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#667eea",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  resumeButtonText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#FFFFFF",
    marginLeft: 8,
  },
  gameArea: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    overflow: "hidden",
  },
  cardsGrid: {
    flex: 1,
    position: "relative",
    zIndex: 2,
  },
  twoCardsStack: {
    flex: 1,
    justifyContent: "center",
  },
  twoCardSlot: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredCard: {
    margin: 0,
  },
  instructions: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#E1E8ED",
  },
  instructionsText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  deckPile: {
    position: "absolute",
    top: "50%",
    zIndex: 1,
  },
  deckPileLayer: {
    position: "absolute",
  },
  deckBadge: {
    position: "absolute",
    left: "31%",
    top: "40%",
    backgroundColor: "#667eea",
    borderRadius: 18,
    minWidth: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  deckBadgeText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "Inter-Bold",
  },
});

export default GameScreen;
