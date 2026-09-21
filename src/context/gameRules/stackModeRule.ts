import { generateCards } from "@/utils";

import { GameState } from "../gameTypes";
import { createPlayers } from "./sharedRules";

export const startStackGame = (state: GameState): GameState => {
  const deck = generateCards(56);
  const players = state.players.length
    ? state.players.slice(0, state.numPlayers)
    : createPlayers(state.numPlayers);
  const playerStacks = players.map((_, index) => [deck[index]]);

  return {
    ...state,
    cards: [],
    centerDeck: deck.slice(players.length),
    finishedPlayerIndexes: [],
    foundStacks: players.map(() => []),
    initialPlayerCardCount: 1,
    memoryCards: [],
    players,
    playerStacks,
    gameOver: false,
    gamePaused: false,
  };
};

export function resolveStackModeMatch(
  state: GameState,
  selectedCardIds: string[] = [],
  receiverIndex?: number,
): GameState {
  const centerCard = state.centerDeck[0];
  if (!centerCard) return { ...state, gameOver: true };

  const resolvedReceiverIndex =
    receiverIndex ??
    state.playerStacks.findIndex((stack) =>
      selectedCardIds.includes(stack[stack.length - 1]?.id),
    );
  if (resolvedReceiverIndex < 0) return state;

  const playerStacks = state.playerStacks.map((stack, index) =>
    index === resolvedReceiverIndex ? [...stack, centerCard] : stack,
  );
  const centerDeck = state.centerDeck.slice(1);

  return {
    ...state,
    centerDeck,
    playerStacks,
    gameOver: centerDeck.length === 0,
  };
}
