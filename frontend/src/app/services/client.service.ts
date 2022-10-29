import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SnackbarService} from './snackbar.service';
import {Client} from '@model/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientURL: string = environment.host + 'api/clients';

  constructor(private httpClient: HttpClient,
              private snackbarService: SnackbarService) {
  }

  addClient(client: Client) {
    return this.httpClient.post(`${this.clientURL}/addClient`, client,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  updateClient(client: Client) {
    return this.httpClient.put(`${this.clientURL}/updateClient/${client._id}`, client,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  getAllClients() {
    return this.httpClient.get(`${this.clientURL}/allClients`)
      .pipe(this.snackbarService.catchError$);
  }

  getClientById(id: any) {
    return this.httpClient.get(`${this.clientURL}/getClient/${id}`)
      .pipe(this.snackbarService.catchError$);
  }

  deleteClient(id: any) {
    return this.httpClient.delete(`${this.clientURL}/deleteClient/${id}`,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

}
