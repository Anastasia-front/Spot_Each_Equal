import YouModeBoard from "./components/YouModeBoard";
import MeModeBoard from "./me/MeModeBoard";
import { StackModeBoardProps } from "./types/stackMode.types";

const StackModeBoard = ({ gameMode, ...boardProps }: StackModeBoardProps) => {
  if (gameMode === "you") {
    return <YouModeBoard {...boardProps} />;
  }

  return <MeModeBoard {...boardProps} />;
};

export default StackModeBoard;
