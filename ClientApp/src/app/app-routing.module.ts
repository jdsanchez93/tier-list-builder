import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'tier-list', loadChildren: () => import('./collaborative-tier-list/collaborative-tier-list.module').then(m => m.CollaborativeTierListModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
