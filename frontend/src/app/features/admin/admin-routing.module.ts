import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllUsersComponent} from './all-users/all-users.component';
import {AllRolesComponent} from '@app/features/admin/all-roles/all-roles.component';

const routes: Routes = [
  {
    path: 'all-users',
    component: AllUsersComponent
  },
  {
    path: 'all-roles',
    component: AllRolesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
