import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SnackbarService} from './snackbar.service';
import {Product} from '@model/product.model';

interface Message {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductAchatService {

  productAchatURL: string = environment.host + 'api/productAchats';

  constructor(private httpClient: HttpClient,
              private snackbarService: SnackbarService) {
  }

  addProductAchat(productAchat: Product) {
    return this.httpClient.post<Message>(`${this.productAchatURL}/addProductAchat`, productAchat,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  updateProductAchat(productAchat: Product) {
    return this.httpClient.put<Message>(`${this.productAchatURL}/updateProductAchat/${productAchat._id}`, productAchat,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  updateProductQuantity(productQuantity: any) {
    return this.httpClient.put(`${this.productAchatURL}/updateProductQuantity`, productQuantity,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  getAllProductAchats() {
    return this.httpClient.get<Product[]>(`${this.productAchatURL}/allProductAchats`)
      .pipe(this.snackbarService.catchError$);
  }

  getProductAchatById(id: any) {
    return this.httpClient.get<Product>(`${this.productAchatURL}/getProductAchat/${id}`)
      .pipe(this.snackbarService.catchError$);
  }


  deleteProductAchat(id: any) {
    return this.httpClient.delete<Message>(`${this.productAchatURL}/deleteProductAchat/${id}`,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }


  getProductAchatByCategory(name: any) {
    return this.httpClient.get<Product>(`${this.productAchatURL}/getProductAchatByCategory/${name}`,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.catchError$);
  }

}
