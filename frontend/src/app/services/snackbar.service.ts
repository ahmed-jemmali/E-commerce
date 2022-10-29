import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GlobalConstants} from '../shared/global-constants';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

interface Message {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  // defaultConfig: MatSnackBarConfig = {};

  constructor(private snackbar: MatSnackBar) {
  }

  // setConfig(config: Partial<MatSnackBarConfig>) {
  //   this.defaultConfig = {...config, ...this.defaultConfig};
  // }

  catchError$ = catchError(error => {
    const errorMessage = error.error.message ? error.error.message : GlobalConstants.genericError;
    this.openSnackBar(errorMessage, GlobalConstants.error);
    return throwError(errorMessage) as Observable<any>;
  });

  handleMessage$ = tap((response: Message) => {
    this.openSnackBar(response.message, '');
  });

  openSnackBar(message: string, action: string) {
    if (action === 'error') {
      const config: any = {
        // ...this.defaultConfig,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['black-snackbar'],
      };
      console.log(config.viewContainerRef);
      this.snackbar.open(message, '', config);
    } else {
      this.snackbar.open(message, '', {
        // ...this.defaultConfig,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['green-snackbar'],
      });
    }
  }
}
