import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SnackbarService} from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class FactureAchatService {

  apiURL: string = environment.host + 'api/achats';

  constructor(private httpClient: HttpClient,
              private snackbarService: SnackbarService) {
  }

  getAllFacturesAchat() {
    return this.httpClient.get(`${this.apiURL}/allFacturesAchat`)
      .pipe(this.snackbarService.catchError$);
  }

  getFactureAchatById(id: any) {
    return this.httpClient.get(`${this.apiURL}/getFactureAchat/${id}`)
      .pipe(this.snackbarService.catchError$);
  }

  deleteFactureAchat(id: any) {
    return this.httpClient.delete(`${this.apiURL}/deleteFactureAchat/${id}`,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

}
