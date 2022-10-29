import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {switchMap} from 'rxjs/operators';
import {saveAs} from 'file-saver';
import {FactureAchatService} from '@app/services/facture-achat.service';
import {AchatService} from '@app/services/achat.service';

@Component({
  selector: 'app-all-factures-achat',
  templateUrl: './all-factures-achat.component.html',
  styleUrls: ['./all-factures-achat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllFacturesAchatComponent implements OnInit {

  responseMessage: any;
  dataSources$ = new BehaviorSubject([]);
  searchValue: string;

  constructor(private router: Router,
              private factureAchatService: FactureAchatService,
              private ngxService: NgxUiLoaderService,
              private achatService: AchatService) {
  }


  ngOnInit() {
    this.factureAchatService.getAllFacturesAchat()
      .subscribe(value => {
        this.dataSources$.next(value);
      });
  }

  handleViewAction(id: any) {
    this.router.navigate([`invoice/purchase/${id}`]);
  }

  handleDeleteAction(id: any) {
    this.factureAchatService.deleteFactureAchat(id)
      .pipe(switchMap(value => this.factureAchatService.getAllFacturesAchat()))
      .subscribe(value => {
        this.dataSources$.next(value);
      });
  }

  downloadReportAction(values: any) {
    this.ngxService.start();
    const data = {
      name: values.name,
      email: values.email,
      uuid: values.uuid,
      contactNumber: values.contactNumber,
      paymentMethod: values.paymentMethod,
      totalAmount: values.total,
      productDetails: values.productDetails
    };
    this.achatService.getPDF(data).subscribe(
      (response: any) => {
        saveAs(response, values.uuid + '.pdf');
        this.ngxService.stop();
      }
    );
  }

}
