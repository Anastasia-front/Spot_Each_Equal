import { findCommonSymbol, generateCards } from "@/utils";

export const createPlayers = (count: number) =>
  Array.from({ length: count }, (_, index) => `Player ${index + 1}`);

export const generateCardsWithDifferentVisibleMatch = (
  cardsToMatch: number,
  previousSymbol: string,
) => {
  for (let attempt = 0; attempt < 8; attempt++) {
    const cards = generateCards(56);
    const visibleMatch = findCommonSymbol(
      cards.slice(0, cardsToMatch).map((card) => card.symbols),
    );

    if (visibleMatch !== previousSymbol) return cards;
  }

  return generateCards(56);
};
