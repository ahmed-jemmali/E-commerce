import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryComponent} from '@app/features/stock/category/category.component';
import {ProductComponent} from '@app/features/stock/product/product.component';
import {ProductAchatComponent} from '@app/features/stock/product-achat/product-achat.component';

const routes: Routes = [
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'product/sale',
    component: ProductComponent
  },
  {
    path: 'product/purchase',
    component: ProductAchatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule {
}
