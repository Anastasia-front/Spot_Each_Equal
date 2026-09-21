import { generateCards } from "@/utils";

import {
  duelModes,
  generateCardsWithDifferentVisibleMatch,
  initialState,
  memoryModes,
  resetModes,
  resolveDuelMatch,
  resolveMemoryMatch,
  resolveResetMatch,
  resolveSmallPileMatch,
  resolveStackModeMatch,
  smallPileModes,
  stackModes,
  startDuelGame,
  startMemoryGame,
  startResetGame,
  startSmallPileGame,
  startStackGame,
} from "./gameRules";
import { Action, GameState } from "./gameTypes";

export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "SET_GAME_MODE":
      return setGameMode(state, action.payload);
    case "SET_NUM_PLAYERS":
      return { ...state, numPlayers: action.payload };
    case "SET_PLAYERS":
      return { ...state, players: action.payload };
    case "SET_CARDS_TO_MATCH":
      return { ...state, cardsToMatch: action.payload };
    case "START_GAME":
      return startGame(state);
    case "MATCH_FOUND":
      return matchFound(state, action);
    case "CLEAR_MATCH":
      return { ...state };
    case "RESET_GAME":
      return {
        ...initialState,
        cards: generateCards(),
        cardsToMatch: state.cardsToMatch,
      };
    case "PAUSE_GAME":
      return { ...state, gamePaused: true };
    case "RESUME_GAME":
      return { ...state, gamePaused: false };
    default:
      return state;
  }
}

const setGameMode = (state: GameState, gameMode: string): GameState => {
  return { ...state, cardsToMatch: 2, gameMode };
};

const startGame = (state: GameState): GameState => {
  if (state.gameMode && stackModes.has(state.gameMode)) {
    return startStackGame(state);
  }

  if (state.gameMode && memoryModes.has(state.gameMode)) {
    return startMemoryGame(state);
  }

  if (state.gameMode && resetModes.has(state.gameMode)) {
    return startResetGame(state);
  }

  if (state.gameMode && duelModes.has(state.gameMode)) {
    return startDuelGame(state);
  }

  if (state.gameMode && smallPileModes.has(state.gameMode)) {
    return startSmallPileGame(state);
  }

  return {
    ...state,
    cards: generateCards(56),
    centerDeck: [],
    finishedPlayerIndexes: [],
    foundStacks: [],
    initialPlayerCardCount: 0,
    memoryCards: [],
    playerStacks: [],
    gameOver: false,
    gamePaused: false,
  };
};

const matchFound = (
  state: GameState,
  action: Extract<Action, { type: "MATCH_FOUND" }>,
): GameState => {
  if (state.gameMode && stackModes.has(state.gameMode)) {
    return resolveStackModeMatch(
      state,
      action.payload.selectedCardIds,
      action.payload.receiverIndex,
    );
  }

  if (state.gameMode && memoryModes.has(state.gameMode)) {
    return resolveMemoryMatch(state, action.payload.receiverIndex);
  }

  if (state.gameMode && resetModes.has(state.gameMode)) {
    return resolveResetMatch(state, action.payload.playerIndex);
  }

  if (state.gameMode && duelModes.has(state.gameMode)) {
    return resolveDuelMatch(state, action.payload.playerIndex);
  }

  if (state.gameMode && smallPileModes.has(state.gameMode)) {
    return resolveSmallPileMatch(
      state,
      action.payload.selectedCardIds,
      action.payload.playerIndex,
    );
  }

  return {
    ...state,
    cards: generateCardsWithDifferentVisibleMatch(
      state.cardsToMatch,
      action.payload.symbol,
    ),
  };
};
