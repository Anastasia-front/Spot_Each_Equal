type SymbolLike = string | { icon: string };

const getSymbolName = (symbol: SymbolLike) =>
  typeof symbol === "string" ? symbol : symbol.icon;

export const findCommonSymbol = (allSymbols: SymbolLike[][]) => {
  const symbolNames = allSymbols.map((symbols) => symbols.map(getSymbolName));

  return (
    symbolNames.reduce((common, symbols) =>
      common.filter((sym) => symbols.includes(sym)),
    )[0] || null
  );
};
