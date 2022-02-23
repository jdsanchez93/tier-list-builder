import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollaborativeTierListRoutingModule } from './collaborative-tier-list-routing.module';
import { CollaborativeTierListComponent } from './collaborative-tier-list/collaborative-tier-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { tierListReducer } from './state/reducers';
import { TierListEffects } from './state/tier-list.effects';


@NgModule({
  declarations: [
    CollaborativeTierListComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    CollaborativeTierListRoutingModule,
    StoreModule.forRoot({tierList: tierListReducer}, {}),
    EffectsModule.forRoot([TierListEffects])
  ]
})
export class CollaborativeTierListModule { }
