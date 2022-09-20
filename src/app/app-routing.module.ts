import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductionComponent } from './production/production.component';

const routes: Routes = [
  { path: '', redirectTo: '/production', pathMatch: 'full'},
  { path: 'production', component: ProductionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
