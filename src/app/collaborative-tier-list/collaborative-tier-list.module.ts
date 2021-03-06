import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollaborativeTierListRoutingModule } from './collaborative-tier-list-routing.module';
import { CollaborativeTierListComponent } from './collaborative-tier-list/collaborative-tier-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { tierListFeatureKey, tierListReducer } from './state/tier-list.reducer';
import { TierListEffects } from './state/tier-list.effects';
import { PositionalTierListItemComponent } from './positional-tier-list-item/positional-tier-list-item.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    CollaborativeTierListComponent,
    PositionalTierListItemComponent,
    AddItemComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    CollaborativeTierListRoutingModule,
    StoreModule.forFeature(tierListFeatureKey, tierListReducer),
    EffectsModule.forFeature([TierListEffects]),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class CollaborativeTierListModule { }
