import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Product} from '@model/product.model';
import {SnackbarService} from './snackbar.service';

interface Message {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productURL: string = environment.host + 'api/products';

  constructor(private httpClient: HttpClient,
              private snackbarService: SnackbarService) {
  }

  addProduct(product: Product) {
    return this.httpClient.post<Message>(`${this.productURL}/addProduct`, product,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);

  }

  updateProduct(product: Product) {
    return this.httpClient.put(`${this.productURL}/updateProduct/${product._id}`, product,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  updateProductQuantity(productQuantity: any) {
    return this.httpClient.put(`${this.productURL}/updateProductQuantity`, productQuantity,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  getAllProducts() {
    return this.httpClient.get<Product[]>(`${this.productURL}/allProducts`)
      .pipe(this.snackbarService.catchError$);
  }

  getProductById(id: string) {
    return this.httpClient.get(`${this.productURL}/getProduct/${id}`)
      .pipe(this.snackbarService.catchError$);
  }

  deleteProduct(id: string) {
    return this.httpClient.delete(`${this.productURL}/deleteProduct/${id}`,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  getProductByCategory(name: any) {
    return this.httpClient.get(`${this.productURL}/getProductByCategory/${name}`,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.catchError$);
  }
}
