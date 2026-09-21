type ResultPlayer = {
  name: string;
  score: number;
};

type GameResults = {
  isRanking: boolean;
  localPlayerWon: boolean;
  players: ResultPlayer[];
  winnerNames: string;
};

export const getGameResults = (
  gameMode: string | null,
  players: string[],
  playerStacks: any[][],
  foundStacks: any[][] = [],
  finishedPlayerIndexes: number[] = [],
  initialPlayerCardCount = 0,
): GameResults => {
  if (gameMode === "reset") {
    const rankedIndexes = [
      ...finishedPlayerIndexes,
      ...players
        .map((_, index) => index)
        .filter((index) => !finishedPlayerIndexes.includes(index))
        .sort(
          (a, b) => (playerStacks[a]?.length ?? 0) - (playerStacks[b]?.length ?? 0),
        ),
    ];
    const resultPlayers = rankedIndexes.map((index) => ({
      name: players[index] ?? `Player ${index + 1}`,
      score: Math.max(
        initialPlayerCardCount - (playerStacks[index]?.length ?? 0),
        0,
      ),
    }));

    return {
      isRanking: true,
      localPlayerWon: rankedIndexes[0] === 0,
      players: resultPlayers,
      winnerNames: resultPlayers[0]?.name ?? "",
    };
  }

  if (gameMode === "duel") {
    const resultPlayers = players.slice(0, 2).map((name, index) => ({
      name,
      score: foundStacks[index]?.length ?? 0,
    }));
    const targetValue = Math.max(
      ...resultPlayers.map((player) => player.score),
    );
    const winnerIndexes = resultPlayers
      .map((player, index) => (player.score === targetValue ? index : -1))
      .filter((index) => index >= 0);

    return {
      isRanking: false,
      localPlayerWon: winnerIndexes.includes(0),
      players: resultPlayers,
      winnerNames: winnerIndexes
        .map((index) => resultPlayers[index].name)
        .join(", "),
    };
  }

  if (gameMode === "smallPile") {
    const resultPlayers = players.map((name, index) => ({
      name,
      score: foundStacks[index]?.length ?? 0,
    }));
    const targetValue = Math.max(
      ...resultPlayers.map((player) => player.score),
    );
    const winnerIndexes = resultPlayers
      .map((player, index) => (player.score === targetValue ? index : -1))
      .filter((index) => index >= 0);

    return {
      isRanking: false,
      localPlayerWon: winnerIndexes.includes(0),
      players: resultPlayers,
      winnerNames: winnerIndexes
        .map((index) => resultPlayers[index].name)
        .join(", "),
    };
  }

  if (gameMode === "memo") {
    const resultPlayers = players.map((name, index) => ({
      name,
      score: foundStacks[index]?.length ?? 0,
    }));
    const targetValue = Math.max(
      ...resultPlayers.map((player) => player.score),
    );
    const winnerIndexes = resultPlayers
      .map((player, index) => (player.score === targetValue ? index : -1))
      .filter((index) => index >= 0);

    return {
      isRanking: false,
      localPlayerWon: winnerIndexes.includes(0),
      players: resultPlayers,
      winnerNames: winnerIndexes
        .map((index) => resultPlayers[index].name)
        .join(", "),
    };
  }

  const resultPlayers = playerStacks.map((stack, index) => ({
    name: players[index] ?? `Player ${index + 1}`,
    score: Math.max(stack.length - 1, 0),
  }));
  const values = playerStacks.map((stack, index) =>
    gameMode === "you" ? stack.length : resultPlayers[index].score,
  );
  const targetValue =
    gameMode === "you" ? Math.min(...values) : Math.max(...values);
  const winnerIndexes = values
    .map((value, index) => (value === targetValue ? index : -1))
    .filter((index) => index >= 0);

  return {
    isRanking: false,
    localPlayerWon: winnerIndexes.includes(0),
    players: resultPlayers,
    winnerNames: winnerIndexes
      .map((index) => resultPlayers[index].name)
      .join(", "),
  };
};
