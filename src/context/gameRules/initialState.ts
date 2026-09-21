import { GameState } from "../gameTypes";

export const initialState: GameState = {
  cards: [],
  cardsToMatch: 2,
  centerDeck: [],
  finishedPlayerIndexes: [],
  foundStacks: [],
  gameMode: null,
  initialPlayerCardCount: 0,
  memoryCards: [],
  players: [],
  playerStacks: [],
  numPlayers: 2,
  gamePaused: false,
  gameOver: false,
};
