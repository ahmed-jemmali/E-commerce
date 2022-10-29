import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FactureService} from '@app/services/facture.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FactureComponent implements OnInit {

  id: string;
  data$ = new BehaviorSubject([]);
  dataSource: any = {};

  constructor(private factureService: FactureService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.factureService.getFactureById(this.id)
      .subscribe((value) => {
        this.dataSource = value;
        this.data$.next(JSON.parse(value.productDetails));
      });
  }

}
