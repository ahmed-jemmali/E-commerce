import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'ERP';

  constructor(private ngxService: NgxUiLoaderService) {
  }

  ngOnInit(): void {
    this.ngxService.start();
  }

  deactivate() {
    this.ngxService.start();
  }

  activate() {
    this.ngxService.stop();
  }
}
