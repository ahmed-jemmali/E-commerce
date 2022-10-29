import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SnackbarService} from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ManageImageService {

  manageImageURL: string = environment.host + 'api/manageImages';

  constructor(private httpClient: HttpClient,
              private snackbarService: SnackbarService) {
  }

  uploadImage(user: any, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this.httpClient.put(`${this.manageImageURL}/uploadImage/${user._id}`, formData)
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  deleteImage(id: any) {
    return this.httpClient.delete(`${this.manageImageURL}/deleteImage/${id}`,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }
}
