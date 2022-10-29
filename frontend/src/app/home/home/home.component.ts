import {Component, OnInit} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService) {

  }

  ngOnInit(): void {

  }

  deactivate() {
    this.ngxService.start();
  }

  activate() {
    this.ngxService.stop();
  }

}
