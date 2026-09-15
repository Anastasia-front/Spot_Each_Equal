import * as Icons from "@/assets/icons";
import { layoutIconsInHex } from "./iconsLayout";

type SymbolData = {
  icon: string;
  position: { x: number; y: number };
  rotation: number;
  size: number;
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
  symbolsPerCard: number,
): string[][] {
  const n = symbolsPerCard - 1;
  const totalSymbolsNeeded = n * n + n + 1;
  if (symbols.length < totalSymbolsNeeded) {
    throw new Error(
      `Need at least ${totalSymbolsNeeded} symbols to build a deck with ${symbolsPerCard} per card`,
    );
  }

  const deck: string[][] = [];

  // First card
  const firstCard = Array.from(
    { length: symbolsPerCard },
    (_, i) => symbols[i],
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

export const generateCards = (count?: number): Card[] => {
  const allIcons = Object.keys(Icons);
  const deckSymbolSets = generateSpotItDeck(allIcons, SYMBOLS_PER_CARD);

  const selectedSets = count
    ? deckSymbolSets.slice(0, Math.min(count, deckSymbolSets.length))
    : deckSymbolSets;

  return selectedSets.map((symbolSet, cardIndex) => {
    const positions = layoutIconsInHex(symbolSet.length, {
      safeRadius: 0.92,
      jitter: 0.04,
      minSeparation: 0.55,
      iterations: 10,
    });

    return {
      id: `card-${cardIndex}`,
      symbols: symbolSet.map((iconName, i) => ({
        icon: iconName,
        position: positions[i],
        rotation: Math.round((Math.random() * 2 - 1) * 38),
        size: 0.15 + Math.random() * 0.12,
      })),
    };
  });
};

export const getCardSize = (numCards: number, screenWidth: number) =>
  Math.max(screenWidth / (numCards + 1), 160);

export const getCardPosition = (
  index: number,
  totalCards: number,
  radius: number,
  centerX: number,
  centerY: number,
) => {
  const angle = (index / totalCards) * 2 * Math.PI; // divide circle evenly
  const x = centerX + radius * Math.cos(angle) - radius / 2; // adjust by half card width
  const y = centerY + radius * Math.sin(angle) - radius / 2; // adjust by half card height
  return { x, y };
};
