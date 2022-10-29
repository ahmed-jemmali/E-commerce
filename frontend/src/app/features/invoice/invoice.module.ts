import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InvoiceRoutingModule} from './invoice-routing.module';
import {AllFacturesAchatComponent} from './all-factures-achat/all-factures-achat.component';
import {AllFacturesComponent} from './all-factures/all-factures.component';
import {FactureComponent} from './facture/facture.component';
import {FactureAchatComponent} from './facture-achat/facture-achat.component';
import {FormsModule} from '@angular/forms';
import {SaleInvoiceFilterPipe} from '@app/pipes/sale-invoice-filter.pipe';
import {PurchaseInvoiceFilterPipe} from '@app/pipes/purchase-invoice-filter.pipe';

@NgModule({
  declarations: [
    AllFacturesComponent,
    AllFacturesAchatComponent,
    FactureComponent,
    FactureAchatComponent,
    SaleInvoiceFilterPipe,
    PurchaseInvoiceFilterPipe,


  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    FormsModule,
  ]
})
export class InvoiceModule {
}
