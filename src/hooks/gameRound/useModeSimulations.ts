import {
  GameModeFlags,
  GameRoundDispatch,
  MatchFeedbackControls,
  RoundState,
} from "./types";
import {
  useDuelOpponentSimulation,
  useResetOpponentSimulation,
  useStackRemoteSimulation,
} from "./useRemoteSimulations";

export const useModeSimulations = ({
  animateCenterCardToReceiver,
  clearSelection,
  dispatch,
  feedbackControls,
  flags,
  gameMode,
  selectedSymbolsLength,
  state,
}: {
  animateCenterCardToReceiver: (
    receiverIndex: number,
    onComplete: () => void,
  ) => void;
  clearSelection: () => void;
  dispatch: GameRoundDispatch;
  feedbackControls: MatchFeedbackControls;
  flags: GameModeFlags;
  gameMode?: string;
  selectedSymbolsLength: number;
  state: RoundState;
}) => {
  useStackRemoteSimulation({
    ...feedbackControls,
    animateCenterCardToReceiver,
    clearSelection,
    dispatch,
    gameMode,
    selectedSymbolsLength,
    stackMode: flags.stackMode,
    state,
  });
  useResetOpponentSimulation({
    ...feedbackControls,
    clearSelection,
    dispatch,
    resetMode: flags.resetMode,
    selectedSymbolsLength,
    state,
  });
  useDuelOpponentSimulation({
    ...feedbackControls,
    clearSelection,
    dispatch,
    duelMode: flags.duelMode,
    selectedSymbolsLength,
    state,
  });
};
