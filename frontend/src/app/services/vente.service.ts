import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  apiURL: string = environment.host + 'api/factures';
  constructor(private httpClient: HttpClient) { }

  generateReport(data: any) {
    return this.httpClient.post<{ message: any }>(`${this.apiURL}/generateReport`, data,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  getPDF(data: any): Observable<Blob> {
    return this.httpClient.post(`${this.apiURL}/getPdf`, data, { responseType: 'blob' });
  }

}
