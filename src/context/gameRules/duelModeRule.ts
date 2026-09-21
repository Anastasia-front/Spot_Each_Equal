import { generateCards } from "@/utils";

import { GameState } from "../gameTypes";
import { createPlayers } from "./sharedRules";

export const startDuelGame = (state: GameState): GameState => {
  const deck = generateCards(56);
  const players = state.players.length
    ? state.players.slice(0, 2)
    : createPlayers(2);
  const playerStacks = [
    deck.slice(0, deck.length / 2),
    deck.slice(deck.length / 2),
  ];

  return {
    ...state,
    cards: [],
    centerDeck: [],
    finishedPlayerIndexes: [],
    foundStacks: players.map(() => []),
    initialPlayerCardCount: deck.length / 2,
    memoryCards: [],
    numPlayers: 2,
    players,
    playerStacks,
    gameOver: false,
    gamePaused: false,
  };
};

export function resolveDuelMatch(state: GameState, winnerIndex = 0): GameState {
  const loserIndex = winnerIndex === 0 ? 1 : 0;
  const opponentStack = state.playerStacks[loserIndex] ?? [];
  const capturedCard = opponentStack[opponentStack.length - 1];
  if (!capturedCard) return { ...state, gameOver: true };

  const playerStacks = state.playerStacks.map((stack, index) =>
    index === loserIndex ? stack.slice(0, -1) : stack,
  );
  const foundStacks = state.foundStacks.map((stack, index) =>
    index === winnerIndex ? [...stack, capturedCard] : stack,
  );
  const gameOver = playerStacks[loserIndex].length === 0;

  return {
    ...state,
    foundStacks,
    playerStacks,
    gameOver,
  };
}
