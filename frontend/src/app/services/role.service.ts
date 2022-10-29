import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {SnackbarService} from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  roleURL: string = environment.host + 'api/roles';

  constructor(private httpClient: HttpClient,
              private snackbarService: SnackbarService) {
  }

  addRole(role: any) {
    return this.httpClient.post(`${this.roleURL}/addRole`, role,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  getAllRoles() {
    return this.httpClient.get(`${this.roleURL}/allRoles`)
      .pipe(this.snackbarService.catchError$);
  }

  deleteRole(id: any) {
    return this.httpClient.delete<{ message: any }>(`${this.roleURL}/deleteRole/${id}`,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

}
