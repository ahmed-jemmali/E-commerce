import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StockRoutingModule} from './stock-routing.module';
import {CategoryComponent} from './category/category.component';
import {ProductComponent} from './product/product.component';
import {ProductAchatComponent} from './product-achat/product-achat.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductCategoryFilterPipe} from '@app/pipes/product-category-filter.pipe';
import {PurchaseProductFilterPipe} from '@app/pipes/purchase-product-filter.pipe';
import {SaleProductFilterPipe} from '@app/pipes/sale-product-filter.pipe';

@NgModule({
  declarations: [
    CategoryComponent,
    ProductComponent,
    ProductAchatComponent,
    ProductCategoryFilterPipe,
    PurchaseProductFilterPipe,
    SaleProductFilterPipe,
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StockModule {
}
