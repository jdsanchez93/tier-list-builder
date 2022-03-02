import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PositionalTierListItem } from '../tier-list-models';
import { addItem } from '../state/tier-list.actions';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  @Input() tierListId!: number;

  tierListItemForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.tierListItemForm = this.formBuilder.group({
      itemLabel: ['', Validators.required]
    });;
  }

  ngOnInit(): void {
  }

  submit() {
    if (!this.tierListItemForm.valid) {
      return;
    }
    const itemToPost: PositionalTierListItem = {
      positionalTierListItemId: 0,
      tierListId: this.tierListId,
      positionX: 0,
      positionY: 0,
      label: this.tierListItemForm.controls['itemLabel'].value
    };
    this.store.dispatch(addItem({ item: itemToPost }));
  }

}
