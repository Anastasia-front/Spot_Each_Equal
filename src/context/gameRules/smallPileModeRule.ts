import { generateSmallPileCards } from "@/utils";

import { GameState } from "../gameTypes";
import { createPlayers } from "./sharedRules";

export const startSmallPileGame = (state: GameState): GameState => {
  const players = state.players.length
    ? state.players.slice(0, state.numPlayers)
    : createPlayers(state.numPlayers);

  return {
    ...state,
    cards: generateSmallPileCards(),
    centerDeck: [],
    finishedPlayerIndexes: [],
    foundStacks: players.map(() => []),
    initialPlayerCardCount: 0,
    memoryCards: [],
    players,
    playerStacks: [],
    gameOver: false,
    gamePaused: false,
  };
};

export function resolveSmallPileMatch(
  state: GameState,
  selectedCardIds: string[] = [],
  playerIndex = 0,
): GameState {
  if (selectedCardIds.length < 2) return state;

  const selectedCards = state.cards.filter((card) =>
    selectedCardIds.includes(card.id),
  );
  if (selectedCards.length !== 2) return state;

  const foundStacks = state.foundStacks.map((stack, index) =>
    index === playerIndex ? [...stack, ...selectedCards] : stack,
  );
  const cards = state.cards.filter(
    (card) => !selectedCardIds.includes(card.id),
  );

  return {
    ...state,
    cards,
    foundStacks,
    gameOver: cards.length === 0,
  };
}
