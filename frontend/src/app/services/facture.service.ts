import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {SnackbarService} from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  factureURL: string = environment.host + 'api/factures';
  constructor(private httpClient: HttpClient,
              private snackbarService: SnackbarService) { }

  getAllFactures() {
    return this.httpClient.get(`${this.factureURL}/allFactures`)
      .pipe(this.snackbarService.catchError$);
  }

  getFactureById(id: any) {
    return this.httpClient.get(`${this.factureURL}/getFacture/${id}`)
      .pipe(this.snackbarService.catchError$);
  }

  deleteFacture(id: any) {
    return this.httpClient.delete(`${this.factureURL}/deleteFacture/${id}`,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') })
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

}
