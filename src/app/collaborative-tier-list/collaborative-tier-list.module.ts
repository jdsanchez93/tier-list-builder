import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollaborativeTierListRoutingModule } from './collaborative-tier-list-routing.module';
import { CollaborativeTierListComponent } from './collaborative-tier-list/collaborative-tier-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    CollaborativeTierListComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    CollaborativeTierListRoutingModule
  ]
})
export class CollaborativeTierListModule { }
