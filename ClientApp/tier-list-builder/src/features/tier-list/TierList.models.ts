export interface TierList {
  tierListId: number;
  name?: string;
  tierListRows?: TierListRow[];
}

export interface TierListRow {
  tierListRowId: number;
  name: string;
  index: number;
  tierListId: number;
}