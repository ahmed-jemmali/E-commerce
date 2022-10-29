import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from './client/client.component';
import {SaleComponent} from './sale/sale.component';

const routes: Routes = [
  {
    path: '',
    component: SaleComponent,
  },
  {
    path: 'client',
    component: ClientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule {
}
