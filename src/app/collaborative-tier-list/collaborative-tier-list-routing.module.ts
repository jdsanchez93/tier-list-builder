import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollaborativeTierListComponent } from './collaborative-tier-list/collaborative-tier-list.component';

const routes: Routes = [
  { path: '', component: CollaborativeTierListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollaborativeTierListRoutingModule { }
