import { generateCards } from "@/utils";
import React, { createContext, ReactNode, useContext, useReducer } from "react";

type SymbolData = {
  icon: string;
  position: {
    x: number;
    y: number;
  };
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

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "SET_GAME_MODE":
      let cards;
      switch (action.payload) {
        case "me":
        case "you":
          cards = generateCards(state.numPlayers);
          return {
            ...state,
            cardsToMatch: state.players.length,
            gameMode: action.payload,
          };
        case "memo":
          cards = generateCards(state.numPlayers * 2);
          return {
            ...state,
            cardsToMatch: state.players.length,
            gameMode: action.payload,
          };
        case "duel":
          cards = generateCards(state.numPlayers);
          return { ...state, cardsToMatch: 2, gameMode: action.payload };
        case "smallPile":
          cards = generateCards(55);
          return { ...state, cardsToMatch: 55, gameMode: action.payload };
        default:
          cards = generateCards(2);
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
        cards: generateCards(),
        gameOver: false,
        gamePaused: false,
      };
    case "MATCH_FOUND":
      return { ...state };
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
