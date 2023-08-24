import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductInformationSearchComponent } from './components/product-information-search/product-information-search.component';
import { ProductInformationCreateComponent } from './components/product-information-create/product-information-create.component';
import { ProductInformationUpdateComponent } from './components/product-information-update/product-information-update.component';
import { ProductInformationDeleteComponent } from './components/product-information-delete/product-information-delete.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'search', component: ProductInformationSearchComponent },
      { path: 'create', component: ProductInformationCreateComponent },
      { path: 'update', component: ProductInformationUpdateComponent },
      { path: 'delete', component: ProductInformationDeleteComponent },
      { path: '**', redirectTo: 'search' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialProductInformationRoutingModule { }
