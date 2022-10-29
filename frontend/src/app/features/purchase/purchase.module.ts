import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PurchaseRoutingModule} from './purchase-routing.module';
import {AchatComponent} from './achat/achat.component';
import {SupplierComponent} from './supplier/supplier.component';
import {SupplierCategoryComponent} from './supplier-category/supplier-category.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SupplierFilterPipe} from '@app/pipes/supplier-filter.pipe';
import {SupplierCategoryFilterPipe} from '@app/pipes/supplier-category-filter.pipe';

@NgModule({
  declarations: [
    AchatComponent,
    SupplierComponent,
    SupplierCategoryComponent,
    SupplierFilterPipe,
    SupplierCategoryFilterPipe,
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PurchaseModule {
}
