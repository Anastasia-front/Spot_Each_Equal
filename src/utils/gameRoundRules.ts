export const isCenterAndPlayerPair = (state: any, cardIds: string[]) => {
  const centerCardId = state.centerDeck[0]?.id;
  const playerCardIds = state.playerStacks.map(
    (stack: any[]) => stack[stack.length - 1]?.id,
  );

  return (
    cardIds.includes(centerCardId) &&
    cardIds.some((cardId) => playerCardIds.includes(cardId))
  );
};

export const getStackPairReceiverIndex = (
  state: any,
  cardIds: string[],
  gameMode?: string,
) => {
  const centerCardId = state.centerDeck[0]?.id;
  if (!cardIds.includes(centerCardId)) return -1;

  return state.playerStacks.findIndex((stack: any[], index: number) => {
    const topCardId = stack[stack.length - 1]?.id;
    if (!cardIds.includes(topCardId)) return false;
    if (gameMode === "me") return index === 0;
    if (gameMode === "you") return index !== 0;
    return true;
  });
};

export const getMemoryMatchSymbolIndex = (memoryCard: any, icon: string) =>
  memoryCard?.symbols.findIndex((symbol: any) => symbol.icon === icon) ?? -1;

export const isResetPair = (state: any, cardIds: string[]) => {
  const centerCardId = state.centerDeck[0]?.id;
  const localStack = state.playerStacks[0] ?? [];
  const localCardId = localStack[localStack.length - 1]?.id;

  return cardIds.includes(centerCardId) && cardIds.includes(localCardId);
};

export const isDuelPair = (state: any, cardIds: string[]) => {
  const localStack = state.playerStacks[0] ?? [];
  const opponentStack = state.playerStacks[1] ?? [];
  const localCardId = localStack[localStack.length - 1]?.id;
  const opponentCardId = opponentStack[opponentStack.length - 1]?.id;

  return cardIds.includes(localCardId) && cardIds.includes(opponentCardId);
};

export const createPlayerNames = (count: number) =>
  Array.from({ length: count }, (_, index) =>
    index === 0
      ? "You"
      : (["George", "Maria", "Alex", "Sofia", "Leo", "Nina", "Max"][
          index - 1
        ] ?? `Player ${index + 1}`),
  );
