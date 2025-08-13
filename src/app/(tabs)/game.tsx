import HexagonCard from "@/components/HexagonCard";
import { useGame } from "@/context/GameContext";
import { findMatchingSymbol } from "@/utils";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Pause, Play, RotateCcw } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width: screenWidth } = Dimensions.get("window");

const GameScreen = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useGame();
  const { gameMode: rawGameMode } = useLocalSearchParams();
  const gameMode = Array.isArray(rawGameMode) ? rawGameMode[0] : rawGameMode;

  const [selectedCards, setSelectedCards] = useState<any[]>([]);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedSymbol, setMatchedSymbol] = useState<string | null>(null);

  // Animation values
  const matchScale = useSharedValue(0);
  const cardShake = useSharedValue(0);

  useEffect(() => {
    if (gameMode) {
      dispatch({ type: "SET_GAME_MODE", payload: gameMode });
      dispatch({ type: "SET_PLAYERS", payload: ["Player 1", "Player 2"] });
      dispatch({ type: "START_GAME" });
    }
  }, [gameMode]);

  const triggerHapticFeedback = () => {
    if (Platform.OS !== "web") {
      // Would use Haptics here on native platforms
      console.log("Haptic feedback triggered");
    }
  };

  const handleCardPress = (card: any) => {
    if (state.gamePaused || state.gameOver) return;

    triggerHapticFeedback();

    if (selectedCards.length === 0) {
      setSelectedCards([card]);
    } else if (selectedCards.length === 1) {
      const firstCard = selectedCards[0];
      const matchingSymbol = findMatchingSymbol(firstCard, card);

      if (matchingSymbol) {
        // Match found!
        setMatchedSymbol(matchingSymbol);
        setShowMatch(true);
        setSelectedCards([firstCard, card]);

        // Animate match notification
        matchScale.value = withSequence(withSpring(1.2), withSpring(1));

        dispatch({
          type: "MATCH_FOUND",
          payload: { cards: [firstCard, card], symbol: matchingSymbol },
        });

        // Clear match after 2 seconds
        setTimeout(() => {
          setShowMatch(false);
          setSelectedCards([]);
          setMatchedSymbol(null);
          matchScale.value = 0;
          dispatch({ type: "CLEAR_MATCH" });
        }, 2000);
      } else {
        // No match - shake animation
        cardShake.value = withSequence(
          withTiming(10, { duration: 50 }),
          withTiming(-10, { duration: 50 }),
          withTiming(10, { duration: 50 }),
          withTiming(0, { duration: 50 })
        );
        setSelectedCards([card]);
      }
    } else {
      setSelectedCards([card]);
    }
  };

  const handleNewGame = () => {
    dispatch({ type: "RESET_GAME" });
    if (gameMode) {
      dispatch({ type: "SET_GAME_MODE", payload: gameMode });
      dispatch({ type: "SET_PLAYERS", payload: ["Player 1", "Player 2"] });
      dispatch({ type: "START_GAME" });
    }
    setSelectedCards([]);
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

  const matchAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: matchScale.value }],
      opacity: matchScale.value,
    };
  });

  const cardShakeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: cardShake.value }],
    };
  });

  if (!state.cards.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading game...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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

          <TouchableOpacity style={styles.headerButton} onPress={handleNewGame}>
            <RotateCcw size={20} color="#667eea" />
          </TouchableOpacity>
        </View>
      </View>

      {showMatch && (
        <Animated.View style={[styles.matchNotification, matchAnimatedStyle]}>
          <Text style={styles.matchText}>{t("foundMatch")}</Text>
          <Text style={styles.matchSymbol}>Symbol: {matchedSymbol}</Text>
        </Animated.View>
      )}

      {state.gamePaused && (
        <View style={styles.pauseOverlay}>
          <Text style={styles.pauseText}>Game Paused</Text>
          <TouchableOpacity
            style={styles.resumeButton}
            onPress={handlePauseToggle}
          >
            <Play size={24} color="#FFFFFF" />
            <Text style={styles.resumeButtonText}>{t("buttons.resume")}</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        style={styles.gameArea}
        contentContainerStyle={styles.gameContent}
      >
        <Animated.View style={[styles.cardsGrid, cardShakeStyle]}>
          {state.cards.slice(0, 6).map((card: any) => (
            <HexagonCard
              key={card.id}
              card={card}
              size={screenWidth * 0.35}
              onPress={() => handleCardPress(card)}
              highlighted={selectedCards.some(
                (selected) => selected.id === card.id
              )}
              disabled={state.gamePaused}
            />
          ))}
        </Animated.View>
      </ScrollView>

      <View style={styles.instructions}>
        <Text style={styles.instructionsText}>
          Tap two cards to find the matching symbol between them!
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    paddingVertical: 15,
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
  },
  gameContent: {
    padding: 20,
  },
  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
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
});

export default GameScreen;
