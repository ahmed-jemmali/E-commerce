import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllFacturesAchatComponent} from './all-factures-achat/all-factures-achat.component';
import {AllFacturesComponent} from './all-factures/all-factures.component';
import {FactureComponent} from '@app/features/invoice/facture/facture.component';
import {FactureAchatComponent} from '@app/features/invoice/facture-achat/facture-achat.component';

const routes: Routes = [
  {
    path: 'all/purchase',
    component: AllFacturesAchatComponent
  },
  {
    path: 'all/sale',
    component: AllFacturesComponent
  },
  {
    path: 'sale/:id',
    component: FactureComponent
  },
  {
    path: 'purchase/:id',
    component: FactureAchatComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {
}
