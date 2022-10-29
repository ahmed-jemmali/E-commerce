import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FactureService} from '@app/services/facture.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {VenteService} from '@app/services/vente.service';
import {saveAs} from 'file-saver';
import {BehaviorSubject} from 'rxjs';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-all-factures',
  templateUrl: './all-factures.component.html',
  styleUrls: ['./all-factures.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllFacturesComponent implements OnInit {

  responseMessage: any;
  dataSources$ = new BehaviorSubject([]);
  searchValue: string;

  constructor(private router: Router,
              private factureService: FactureService,
              private ngxService: NgxUiLoaderService,
              private venteService: VenteService) {
  }

  ngOnInit() {
    this.factureService.getAllFactures()
      .subscribe(value => {
        this.dataSources$.next(value);
      });
  }

  handleDeleteAction(id: any) {
    this.factureService.deleteFacture(id)
      .pipe(switchMap(value => this.factureService.getAllFactures()))
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
    this.venteService.getPDF(data).subscribe(
      (response: any) => {
        saveAs(response, values.uuid + '.pdf');
        this.ngxService.stop();
      }
    );
  }

  applyFilter(event: Event) {
    // console.log('event :', event.target);
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSources.filter = filterValue.trim().toLowerCase();
  }
}
