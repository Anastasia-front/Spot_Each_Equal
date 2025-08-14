import * as Icons from "@/assets/icons";
console.info(Icons);

type SymbolData = {
  icon: string; // or actual imported icon type
  position: { x: number; y: number };
};

type Card = {
  id: string;
  symbols: SymbolData[];
};

// number of symbols per card (classic is 8)
const SYMBOLS_PER_CARD = 8;

// Helper: generate Spot It deck
function generateSpotItDeck(
  symbols: string[],
  symbolsPerCard: number
): string[][] {
  const n = symbolsPerCard - 1;
  const totalSymbolsNeeded = n * n + n + 1;
  if (symbols.length < totalSymbolsNeeded) {
    throw new Error(
      `Need at least ${totalSymbolsNeeded} symbols to build a deck with ${symbolsPerCard} per card`
    );
  }

  const deck: string[][] = [];

  // First card
  const firstCard = Array.from(
    { length: symbolsPerCard },
    (_, i) => symbols[i]
  );
  deck.push(firstCard);

  // n cards starting with first symbol
  for (let i = 0; i < n; i++) {
    const card = [symbols[0]];
    for (let j = 0; j < n; j++) {
      card.push(symbols[n + 1 + n * i + j]);
    }
    deck.push(card);
  }

  // Remaining cards
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const card = [symbols[i + 1]];
      for (let k = 0; k < n; k++) {
        const index = n + 1 + n * k + ((i * k + j) % n);
        card.push(symbols[index]);
      }
      deck.push(card);
    }
  }

  return deck;
}

export const generateCards = (): Card[] => {
  const allIcons = Object.keys(Icons);
  const deckSymbolSets = generateSpotItDeck(allIcons, SYMBOLS_PER_CARD);

  return deckSymbolSets.map((symbolSet, cardIndex) => ({
    id: `card-${cardIndex}`,
    symbols: symbolSet.map((iconName) => ({
      icon: iconName,
      position: {
        x: Math.random(),
        y: Math.random(),
      },
    })),
  }));
};
