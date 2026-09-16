import { findCommonSymbol, generateCards } from "@/utils";
import React, { createContext, ReactNode, useContext, useReducer } from "react";

type SymbolData = {
  icon: string;
  position: {
    x: number;
    y: number;
  };
  rotation?: number;
  size?: number;
};

type Card = {
  id: string;
  symbols: SymbolData[];
};

type GameState = {
  cards: Card[];
  cardsToMatch: number;
  gameMode: string | null;
  players: string[];
  numPlayers: number;
  gamePaused: boolean;
  gameOver: boolean;
};

type Action =
  | { type: "SET_GAME_MODE"; payload: string }
  | { type: "SET_PLAYERS"; payload: string[] }
  | { type: "SET_NUM_PLAYERS"; payload: number }
  | { type: "SET_CARDS_TO_MATCH"; payload: number }
  | { type: "START_GAME" }
  | { type: "MATCH_FOUND"; payload: { cards: Card[]; symbol: string } }
  | { type: "CLEAR_MATCH" }
  | { type: "RESET_GAME" }
  | { type: "PAUSE_GAME" }
  | { type: "RESUME_GAME" };

const initialState: GameState = {
  cards: [],
  cardsToMatch: 2,
  gameMode: null,
  players: [],
  numPlayers: 2,
  gamePaused: false,
  gameOver: false,
};

const generateCardsWithDifferentVisibleMatch = (
  cardsToMatch: number,
  previousSymbol: string,
) => {
  for (let attempt = 0; attempt < 8; attempt++) {
    const cards = generateCards(55);
    const visibleMatch = findCommonSymbol(
      cards.slice(0, cardsToMatch).map((card) => card.symbols),
    );

    if (visibleMatch !== previousSymbol) {
      return cards;
    }
  }

  return generateCards(55);
};

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "SET_GAME_MODE":
      switch (action.payload) {
        case "me":
        case "you":
          return {
            ...state,
            cardsToMatch: 2,
            gameMode: action.payload,
          };
        case "memo":
          return {
            ...state,
            cardsToMatch: 2,
            gameMode: action.payload,
          };
        case "reset":
          return { ...state, cardsToMatch: 2, gameMode: action.payload };
        case "duel":
          return { ...state, cardsToMatch: 2, gameMode: action.payload };
        case "smallPile":
          return { ...state, cardsToMatch: 4, gameMode: action.payload };
        default:
          return { ...state, gameMode: action.payload };
      }
    case "SET_NUM_PLAYERS":
      return { ...state, numPlayers: action.payload };
    case "SET_PLAYERS":
      return { ...state, players: action.payload };
    case "SET_CARDS_TO_MATCH":
      return { ...state, cardsToMatch: action.payload };
    case "START_GAME":
      return {
        ...state,
        cards: generateCards(55),
        gameOver: false,
        gamePaused: false,
      };
    case "MATCH_FOUND":
      return {
        ...state,
        cards: generateCardsWithDifferentVisibleMatch(
          state.cardsToMatch,
          action.payload.symbol,
        ),
      };
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

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
