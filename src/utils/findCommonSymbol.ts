export const findCommonSymbol = (allSymbols: string[][]) => {
  return (
    allSymbols.reduce((common, symbols) =>
      common.filter((sym) => symbols.includes(sym))
    )[0] || null
  );
};
