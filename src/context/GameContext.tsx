import { generateCards } from "@/utils";
import React, { createContext, ReactNode, useContext, useReducer } from "react";

type SymbolData = {
  icon: string; // or a component/type for the icon
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
  gameMode: string | null;
  players: string[];
  gamePaused: boolean;
  gameOver: boolean;
};

type Action =
  | { type: "SET_GAME_MODE"; payload: string }
  | { type: "SET_PLAYERS"; payload: string[] }
  | { type: "START_GAME" }
  | { type: "MATCH_FOUND"; payload: { cards: Card[]; symbol: string } }
  | { type: "CLEAR_MATCH" }
  | { type: "RESET_GAME" }
  | { type: "PAUSE_GAME" }
  | { type: "RESUME_GAME" };

const initialState: GameState = {
  cards: [],
  gameMode: null,
  players: [],
  gamePaused: false,
  gameOver: false,
};

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "SET_GAME_MODE":
      return { ...state, gameMode: action.payload };
    case "SET_PLAYERS":
      return { ...state, players: action.payload };
    case "START_GAME":
      return {
        ...state,
        cards: generateCards(),
        gameOver: false,
        gamePaused: false,
      };
    case "MATCH_FOUND":
      // you could update scores or remove cards here
      return { ...state };
    case "CLEAR_MATCH":
      return { ...state };
    case "RESET_GAME":
      return { ...initialState, cards: generateCards() };
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
