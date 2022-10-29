import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SnackbarService} from './snackbar.service';
import {Supplier} from '@model/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  supplierURL: string = environment.host + 'api/suppliers';

  constructor(private httpClient: HttpClient,
              private snackbarService: SnackbarService) {
  }

  addSupplier(supplier: Supplier) {
    return this.httpClient.post(`${this.supplierURL}/addSupplier`, supplier,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  updateSupplier(supplier: Supplier) {
    return this.httpClient.put(`${this.supplierURL}/updateSupplier/${supplier._id}`, supplier,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  getAllSuppliers() {
    return this.httpClient.get(`${this.supplierURL}/allSuppliers`)
      .pipe(this.snackbarService.catchError$);
  }

  getSupplierById(id: any) {
    return this.httpClient.get(`${this.supplierURL}/getSupplier/${id}`)
      .pipe(this.snackbarService.catchError$);
  }

  deleteSupplier(id: any) {
    return this.httpClient.delete(`${this.supplierURL}/deleteSupplier/${id}`,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  getSupplierByCategory(name: any) {
    return this.httpClient.get(`${this.supplierURL}/getSupplierByCategory/${name}`,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.catchError$);
  }

}
