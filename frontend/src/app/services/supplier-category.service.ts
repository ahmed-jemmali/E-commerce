import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SupplierCategory} from '@model/supplierCategory.model';
import {SnackbarService} from './snackbar.service';

interface Message {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupplierCategoryService {

  supplierCategoryURL: string = environment.host + 'api/supplierCategories';

  constructor(private httpClient: HttpClient,
              private snackbarService: SnackbarService) {
  }

  addSupplierCategory(supplierCategory: SupplierCategory) {
    return this.httpClient.post(`${this.supplierCategoryURL}/addSupplierCategory`, supplierCategory,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  updateSupplierCategory(supplierCategory: SupplierCategory) {
    return this.httpClient.put(`${this.supplierCategoryURL}/updateSupplierCategory/${supplierCategory._id}`, supplierCategory,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  getAllSupplierCategories() {
    return this.httpClient.get<SupplierCategory[]>(`${this.supplierCategoryURL}/allSupplierCategories`)
      .pipe(this.snackbarService.catchError$);
  }

  getSupplierCategoryById(id: string) {
    return this.httpClient.get<SupplierCategory>(`${this.supplierCategoryURL}/getSupplierCategory/${id}`)
      .pipe(this.snackbarService.catchError$);
  }

  deleteSupplierCategory(id: string) {
    return this.httpClient.delete(`${this.supplierCategoryURL}/deleteSupplierCategory/${id}`,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }
}
