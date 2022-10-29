import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector,
              private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request)
      .pipe(catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            console.log(err.url);
            if (err.status === 401 || err.status === 403) {
              localStorage.clear();
              this.router.navigate(['/', 'auth', 'login']);
            }
          }
          return throwError(err);
        })
      );
  }


  // intercept(req, next) {
  //   let userService = this.injector.get(UserService)
  //   let tokenizedReq = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${userService.getToken()}`
  //     }
  //   })
  //   return next.handle(tokenizedReq);
  // }


}
