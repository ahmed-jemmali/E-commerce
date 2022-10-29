import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {SnackbarService} from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url: string = environment.host + 'api/dashboard';
  constructor(private httpClient: HttpClient,
              private snackbarService: SnackbarService) { }

  getDetails() {
    return this.httpClient.get(`${this.url}/details`)
      .pipe(this.snackbarService.catchError$);
  }
}
