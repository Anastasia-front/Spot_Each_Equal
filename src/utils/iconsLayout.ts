type Pos = { x: number; y: number };

const EIGHT_SYMBOL_SLOTS: Pos[] = [
  { x: -0.42, y: -0.72 },
  { x: 0.4, y: -0.7 },
  { x: -0.76, y: -0.2 },
  { x: 0, y: -0.26 },
  { x: 0.76, y: -0.18 },
  { x: -0.53, y: 0.43 },
  { x: 0.48, y: 0.4 },
  { x: 0.02, y: 0.76 },
];

const shuffle = <T>(items: T[]) => {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const layoutIconsInHex = (n: number): Pos[] => {
  if (n === EIGHT_SYMBOL_SLOTS.length) {
    return shuffle(EIGHT_SYMBOL_SLOTS);
  }

  const radius = 0.7;
  return Array.from({ length: n }, (_, index) => {
    const angle = (index / n) * Math.PI * 2 - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  });
};
