import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PositionalTierListItem, TierListRow } from '../tier-list-models';

@Component({
  selector: 'app-collaborative-tier-list',
  templateUrl: './collaborative-tier-list.component.html',
  styleUrls: ['./collaborative-tier-list.component.scss']
})
export class CollaborativeTierListComponent implements OnInit {

  tierListItems$: Observable<PositionalTierListItem[]> = of([
    {
      positionalTierListItemId: 1,
      label: 'test item',
      positionX: 50,
      positionY: 75
    }
  ]);
  tierListRows$: Observable<TierListRow[]> = of([
    {
      tierListRowId: 1,
      name: 'A'
    },
    {
      tierListRowId: 2,
      name: 'B'
    },
    {
      tierListRowId: 3,
      name: 'C'
    }
  ])

  constructor() { }

  ngOnInit(): void {
  }

  drag(event: CdkDragEnd<any>, id: number) {
    const position = event.source.getFreeDragPosition();
    console.log('CdkDragEnd', position);
  }

}
