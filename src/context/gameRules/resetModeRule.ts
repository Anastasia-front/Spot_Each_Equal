import { generateCards } from "@/utils";

import { GameState } from "../gameTypes";
import { createPlayers } from "./sharedRules";

export const startResetGame = (state: GameState): GameState => {
  const deck = generateCards(56);
  const players = state.players.length
    ? state.players.slice(0, state.numPlayers)
    : createPlayers(state.numPlayers);
  const handSize = Math.floor((deck.length - 1) / players.length);
  const dealtCardCount = handSize * players.length;
  const playerCards = deck.slice(0, dealtCardCount);
  const playerStacks = players.map((_, index) =>
    playerCards.slice(index * handSize, (index + 1) * handSize),
  );

  return {
    ...state,
    cards: [],
    centerDeck: deck.slice(dealtCardCount),
    finishedPlayerIndexes: [],
    foundStacks: players.map(() => []),
    initialPlayerCardCount: handSize,
    memoryCards: [],
    players,
    playerStacks,
    gameOver: false,
    gamePaused: false,
  };
};

export function resolveResetMatch(
  state: GameState,
  playerIndex = 0,
): GameState {
  const playerStack = state.playerStacks[playerIndex] ?? [];
  const topCard = playerStack[playerStack.length - 1];
  if (!topCard) return state;

  const playerStacks = state.playerStacks.map((stack, index) =>
    index === playerIndex ? stack.slice(0, -1) : stack,
  );
  const playerFinished = playerStacks[playerIndex]?.length === 0;
  const finishedPlayerIndexes =
    playerFinished && !state.finishedPlayerIndexes.includes(playerIndex)
      ? [...state.finishedPlayerIndexes, playerIndex]
      : state.finishedPlayerIndexes;
  const gameOver = playerFinished;

  return {
    ...state,
    centerDeck: [topCard, ...state.centerDeck],
    finishedPlayerIndexes,
    playerStacks,
    gameOver,
  };
}
