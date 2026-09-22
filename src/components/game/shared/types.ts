export type SelectedSymbol = {
  cardId: string;
  symbolIndex: number;
  icon: string;
  status: "selected" | "error" | "success";
};
