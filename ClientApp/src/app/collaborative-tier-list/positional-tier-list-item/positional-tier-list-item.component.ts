import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteItem, updateItem } from '../state/tier-list.actions';
import { PositionalTierListItem } from '../tier-list-models';

@Component({
  selector: 'app-positional-tier-list-item',
  templateUrl: './positional-tier-list-item.component.html',
  styleUrls: ['./positional-tier-list-item.component.scss']
})
export class PositionalTierListItemComponent implements OnInit {
  @Input() item!: PositionalTierListItem;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  drag(event: CdkDragEnd<any>, id: number) {
    const position = event.source.getFreeDragPosition();

    const partialItem: Partial<PositionalTierListItem> = {
      positionX: Math.trunc(position.x),
      positionY: Math.trunc(position.y)
    };

    this.store.dispatch(updateItem({ itemId: id, partialItem: partialItem }));
  }

  deleteItem(id: number) {
    this.store.dispatch(deleteItem({ itemId: id }));
  }

}
