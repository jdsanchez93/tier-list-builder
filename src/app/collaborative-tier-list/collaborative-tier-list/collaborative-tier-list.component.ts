import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PositionalTierListItem, TierListRow } from '../tier-list-models';
import { TierListService } from '../tier-list.service';

@Component({
  selector: 'app-collaborative-tier-list',
  templateUrl: './collaborative-tier-list.component.html',
  styleUrls: ['./collaborative-tier-list.component.scss']
})
export class CollaborativeTierListComponent implements OnInit {

  tierListItems$: Observable<PositionalTierListItem[]>;
  tierListRows$: Observable<TierListRow[]>;

  constructor(private tls: TierListService) {
    this.tierListRows$ = this.tls.getTierList(2).pipe(
      map(t => t.tierListRows)
    );

    this.tierListItems$ = this.tls.getPositionalTierListItems(2);

  }

  ngOnInit(): void {
  }

  drag(event: CdkDragEnd<any>, id: number) {
    const position = event.source.getFreeDragPosition();
    console.log('CdkDragEnd', position);
  }

}
