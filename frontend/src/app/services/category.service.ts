import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Category} from '@model/category.model';
import {SnackbarService} from './snackbar.service';

interface Message {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryURL: string = environment.host + 'api/categories';

  constructor(private httpClient: HttpClient,
              private snackbarService: SnackbarService) {
  }

  addCategory(category: Category) {
    return this.httpClient.post<Message>(`${this.categoryURL}/addCategory`, category,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  updateCategory(category: Category) {
    return this.httpClient.put<Message>(`${this.categoryURL}/updateCategory/${category._id}`, category,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  getAllCategories() {
    return this.httpClient.get<Category[]>(`${this.categoryURL}/allCategories`)
      .pipe(this.snackbarService.catchError$);
  }

  getCategoryById(id: any) {
    return this.httpClient.get<Category>(`${this.categoryURL}/getCategory/${id}`)
      .pipe(this.snackbarService.catchError$);
  }

  deleteCategory(id: any) {
    return this.httpClient.delete<Message>(`${this.categoryURL}/deleteCategory/${id}`,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }
}
