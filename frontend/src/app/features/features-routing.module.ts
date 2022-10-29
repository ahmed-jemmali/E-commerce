import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@app/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('@app/features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'invoice',
    canActivate: [AuthGuard],
    loadChildren: () => import('@app/features/invoice/invoice.module').then(m => m.InvoiceModule)
  },
  {
    path: 'stock',
    canActivate: [AuthGuard],
    loadChildren: () => import('@app/features/stock/stock.module').then(m => m.StockModule)
  },
  {
    path: 'sale',
    canActivate: [AuthGuard],
    loadChildren: () => import('@app/features/sale/sale.module').then(m => m.SaleModule)
  },
  {
    path: 'purchase',
    canActivate: [AuthGuard],
    loadChildren: () => import('@app/features/purchase/purchase.module').then(m => m.PurchaseModule)
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('@app/features/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('@app/features/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {
}
