import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AchatComponent} from './achat/achat.component';
import {SupplierComponent} from './supplier/supplier.component';
import {SupplierCategoryComponent} from './supplier-category/supplier-category.component';

const routes: Routes = [
  {
    path: '',
    component: AchatComponent
  },
  {
    path: 'supplier',
    component: SupplierComponent
  },
  {
    path: 'supplier-category',
    component: SupplierCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule {
}
