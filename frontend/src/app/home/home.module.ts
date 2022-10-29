import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home/home.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ErrorComponent} from './error/error.component';
import {NgxUiLoaderModule} from 'ngx-ui-loader';

import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxUiLoaderModule,

    MatIconModule,
    MatFormFieldModule,
    MatButtonToggleModule
  ]
})
export class HomeModule {
}
