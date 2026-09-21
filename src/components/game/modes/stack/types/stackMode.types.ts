import { SelectedSymbol } from "../../../shared/types";

export type StackModeBoardProps = {
  centerDeck: any[];
  collectAnimatedStyle?: any;
  collectingCard?: any | null;
  collectingReceiverIndex?: number | null;
  disabled: boolean;
  gameMode?: string | null;
  players: string[];
  playerStacks: any[][];
  selectedSymbols: SelectedSymbol[];
  onSymbolPress: (card: any, symbol: any, symbolIndex: number) => void;
};

export type StackBoardProps = Omit<StackModeBoardProps, "gameMode">;

export type StackCardPressHandler = (
  card: any,
  symbol: any,
  symbolIndex: number,
) => void;
