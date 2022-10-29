import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SaleRoutingModule} from './sale-routing.module';
import {SaleComponent} from './sale/sale.component';
import {ClientComponent} from './client/client.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClientFilterPipe} from '@app/pipes/client-filter.pipe';

@NgModule({
  declarations: [
    SaleComponent,
    ClientComponent,
    ClientFilterPipe,

  ],
  imports: [
    CommonModule,
    SaleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SaleModule {
}
