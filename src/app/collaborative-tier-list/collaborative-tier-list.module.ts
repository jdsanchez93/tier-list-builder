import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollaborativeTierListRoutingModule } from './collaborative-tier-list-routing.module';
import { CollaborativeTierListComponent } from './collaborative-tier-list/collaborative-tier-list.component';


@NgModule({
  declarations: [
    CollaborativeTierListComponent
  ],
  imports: [
    CommonModule,
    CollaborativeTierListRoutingModule
  ]
})
export class CollaborativeTierListModule { }
