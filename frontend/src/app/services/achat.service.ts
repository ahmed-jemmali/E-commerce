import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AchatService {

  apiURL: string = environment.host + 'api/achats';
  constructor(private httpClient: HttpClient) { }

  generateReport(data: any) {
    return this.httpClient.post<{ message: any }>(`${this.apiURL}/generateReport`, data,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  getPDF(data: any): Observable<Blob> {
    return this.httpClient.post(`${this.apiURL}/getPdf`, data, { responseType: 'blob' });
  }

}
