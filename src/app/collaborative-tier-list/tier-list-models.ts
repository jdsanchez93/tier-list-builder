export interface TierList {
    tierListId: number,
    name: string,
    tierListRows: TierListRow[]
}

export interface TierListRow {
    tierListRowId: number,
    name: string
}

export interface PositionalTierListItem {
    positionalTierListItemId: number,
    label: string,
    positionX: number,
    positionY: number
}