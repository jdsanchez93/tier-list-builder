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

export interface TierListItem {
  tierListItemId: number;
  name: string;
  imageUrl: string;
  tierListId: number;
}