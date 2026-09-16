export type SelectedSymbol = {
  cardId: string;
  symbolIndex: number;
  icon: string;
  status: "selected" | "error" | "success";
};

export const getSelectedSymbolsForCard = (
  selectedSymbols: SelectedSymbol[],
  cardId: string,
) =>
  selectedSymbols
    .filter((selected) => selected.cardId === cardId)
    .reduce<Record<number, SelectedSymbol["status"]>>((acc, selected) => {
      acc[selected.symbolIndex] = selected.status;
      return acc;
    }, {});
