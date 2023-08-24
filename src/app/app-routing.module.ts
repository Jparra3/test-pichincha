import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'financial-product-information',
    loadChildren: () => import('./financial-product-information/financial-product-information.module').then(m =>m.FinancialProductInformationModule),
  },
  {
    path: '**',
    redirectTo: 'financial-product-information'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
