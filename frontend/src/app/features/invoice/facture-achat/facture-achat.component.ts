import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {FactureAchatService} from '../../../services/facture-achat.service';

@Component({
  selector: 'app-facture-achat',
  templateUrl: './facture-achat.component.html',
  styleUrls: ['./facture-achat.component.css']
})
export class FactureAchatComponent implements OnInit {

  id: string;
  data$ = new BehaviorSubject([]);
  dataSource: any = {};

  constructor(private factureAchatService: FactureAchatService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.factureAchatService.getFactureAchatById(this.id)
      .subscribe((value) => {
        this.dataSource = value;
        console.log('Here get facture by id', value);
        this.data$.next(JSON.parse(value.productDetails));
        console.log('this data : ', this.data$);
      });
  }

}
