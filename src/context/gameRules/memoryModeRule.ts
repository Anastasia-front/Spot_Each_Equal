import { generateCards } from "@/utils";

import { GameState } from "../gameTypes";
import { createPlayers } from "./sharedRules";

export const startMemoryGame = (state: GameState): GameState => {
  const deck = generateCards(56);
  const players = state.players.length
    ? state.players.slice(0, state.numPlayers)
    : createPlayers(state.numPlayers);
  const memoryCards = players.map((_, index) => deck[index]);

  return {
    ...state,
    cards: [],
    centerDeck: deck.slice(players.length),
    finishedPlayerIndexes: [],
    foundStacks: players.map(() => []),
    initialPlayerCardCount: 1,
    memoryCards,
    players,
    playerStacks: players.map((_, index) => [memoryCards[index]]),
    gameOver: false,
    gamePaused: false,
  };
};

export function resolveMemoryMatch(
  state: GameState,
  receiverIndex = 0,
): GameState {
  const centerCard = state.centerDeck[0];
  if (!centerCard) return { ...state, gameOver: true };

  const foundStacks = state.foundStacks.map((stack, index) =>
    index === receiverIndex ? [...stack, centerCard] : stack,
  );
  const centerDeck = state.centerDeck.slice(1);

  return {
    ...state,
    centerDeck,
    foundStacks,
    gameOver: centerDeck.length === 0,
  };
}
