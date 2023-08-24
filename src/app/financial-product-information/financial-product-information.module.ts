import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { FinancialProductInformationRoutingModule } from './financial-product-information-routing.module';
import { ProductInformationSearchComponent } from './components/product-information-search/product-information-search.component';
import { ProductInformationCreateComponent } from './components/product-information-create/product-information-create.component';
import { ProductInformationUpdateComponent } from './components/product-information-update/product-information-update.component';
import ProductInformationDeleteComponent from './components/product-information-delete/product-information-delete.component';


@NgModule({
  declarations: [
    ProductInformationSearchComponent,
    ProductInformationCreateComponent,
    ProductInformationUpdateComponent,
    ProductInformationDeleteComponent
  ],
  imports: [
    CommonModule,
    FinancialProductInformationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FinancialProductInformationModule { }
