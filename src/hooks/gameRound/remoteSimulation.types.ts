import { GameRoundDispatch, MatchFeedbackControls, RoundState } from "./types";

export type RemoteSimulationArgs = MatchFeedbackControls & {
  animateCenterCardToReceiver: (
    receiverIndex: number,
    onComplete: () => void,
  ) => void;
  clearSelection: () => void;
  dispatch: GameRoundDispatch;
  selectedSymbolsLength: number;
  state: RoundState;
};
