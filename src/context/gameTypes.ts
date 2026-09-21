export type SymbolData = {
  icon: string;
  position: {
    x: number;
    y: number;
  };
  rotation?: number;
  size?: number;
};

export type Card = {
  id: string;
  symbols: SymbolData[];
};

export type GameState = {
  cards: Card[];
  cardsToMatch: number;
  centerDeck: Card[];
  finishedPlayerIndexes: number[];
  foundStacks: Card[][];
  gameMode: string | null;
  initialPlayerCardCount: number;
  memoryCards: Card[];
  players: string[];
  playerStacks: Card[][];
  numPlayers: number;
  gamePaused: boolean;
  gameOver: boolean;
};

export type Action =
  | { type: "SET_GAME_MODE"; payload: string }
  | { type: "SET_PLAYERS"; payload: string[] }
  | { type: "SET_NUM_PLAYERS"; payload: number }
  | { type: "SET_CARDS_TO_MATCH"; payload: number }
  | { type: "START_GAME" }
  | {
      type: "MATCH_FOUND";
      payload: {
        cards: Card[];
        playerIndex?: number;
        receiverIndex?: number;
        selectedCardIds?: string[];
        symbol: string;
      };
    }
  | { type: "CLEAR_MATCH" }
  | { type: "RESET_GAME" }
  | { type: "PAUSE_GAME" }
  | { type: "RESUME_GAME" };
