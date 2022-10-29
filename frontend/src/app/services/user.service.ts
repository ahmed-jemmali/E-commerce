import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {SnackbarService} from './snackbar.service';
import jwt_decode from 'jwt-decode';

// import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // headers = new HttpHeaders().set('Content-Type', 'application/json');
  userURL: string = environment.host + 'api/users';

  constructor(private httpClient: HttpClient,
              public router: Router,
              private snackbarService: SnackbarService) {
  }

  signup(user: any) {
    return this.httpClient.post(`${this.userURL}/signup`, user,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  login(user: any) {
    return this.httpClient.post(`${this.userURL}/login`, user,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  getAllUsers() {
    return this.httpClient.get(`${this.userURL}/allUsers`)
      .pipe(this.snackbarService.catchError$);
  }

  changeStatus(user: any) {
    return this.httpClient.put(`${this.userURL}/changeStatus/${user._id}`, user,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  deleteUser(id: any) {
    return this.httpClient.delete(`${this.userURL}/deleteUser/${id}`,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  getUserById(id: any) {
    return this.httpClient.get(`${this.userURL}/getUser/${id}`)
      .pipe(this.snackbarService.catchError$);
  }

  updateUser(user: any) {
    return this.httpClient.put(`${this.userURL}/updateUser/${user._id}`, user,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  changePassword(user: any) {
    return this.httpClient.put(`${this.userURL}/changePassword/${user._id}`, user,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  forgotPassword(data: any) {
    return this.httpClient.put(`${this.userURL}/forgotPassword`, data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  resetPassword(data: any, resetLink: any) {
    return this.httpClient.put(`${this.userURL}/resetPassword/${resetLink}`, data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(this.snackbarService.handleMessage$)
      .pipe(this.snackbarService.catchError$);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    if (token != null) {
      let tokenPayload: any;
      try {
        tokenPayload = jwt_decode(token);
      } catch (err) {
        localStorage.clear();
        this.router.navigate(['/', 'auth', 'login']);
      }
      if ((new Date().getTime() / 1000) > tokenPayload.exp) {
        return false;
      }
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  checkToken() {
    return this.httpClient.get(`${this.userURL}/checkToken`);
  }


  // addUserImage(image: File) {
  //   let formData = new FormData();
  //   formData.append('image', image);
  //   return this.httpClient.post(`${this.userURL}/addUserImage`, formData);
  // }

  // getProfile(){
  //   let headers = new Headers();
  //   this.loadToken();
  //   headers.append('Authorisation',this.authToken);
  //   headers.append('Content-Type','application/json');
  //   return this.httpClient.get(`${this.userURL}/profile`);
  // }


  // storeUserData(token, user) {
  //   localStorage.setItem('id_token', token);
  //   localStorage.setItem('user', JSON.stringify(user));
  //   this.authToken = token;
  //   this.user = user;
  // }

  // editUser(user: any, image: File) {
  //   const formData = new FormData();
  //   formData.append('firstName', user.firstName);
  //   formData.append('lastName', user.lastName);
  //   formData.append('address', user.address);
  //   formData.append('phone', user.phone);
  //   formData.append('username', user.username);
  //   formData.append('image', image);
  //   return this.httpClient.put(`${this.userURL}/editUser/${user._id}`, formData);
  // }
}
