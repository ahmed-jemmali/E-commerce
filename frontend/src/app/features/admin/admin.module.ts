import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AddRoleComponent} from './add-role/add-role.component';
import {AllRolesComponent} from './all-roles/all-roles.component';
import {AllUsersComponent} from './all-users/all-users.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserFilterPipe} from '@app/pipes/user-filter.pipe';

@NgModule({
  declarations: [
    AddRoleComponent,
    AllRolesComponent,
    AllUsersComponent,
    UserFilterPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule {
}
