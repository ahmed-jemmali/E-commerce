import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {SnackbarService} from './snackbar.service';
import jwt_decode from 'jwt-decode';
import {GlobalConstants} from '@app/shared/global-constants';
import {Role} from '@model/role.enum';

interface RolePredicate {
  expectedRole: Role[];
}

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {
  constructor(private auth: AuthService,
              private router: Router,
              private snackbarService: SnackbarService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // todo in back end
    const expectedRoleArray = (route.data as RolePredicate).expectedRole;
    const token: any = localStorage.getItem('token');
    let tokenPayload: any;

    try {
      tokenPayload = jwt_decode(token) as { role: Role[] };
      console.log(tokenPayload);
    } catch (err) {
      localStorage.clear();
      this.router.navigate(['/']);
    }
    if (!this.checkRole(expectedRoleArray, tokenPayload.role)) {
      this.snackbarService.openSnackBar(GlobalConstants.unauthorize, GlobalConstants.error);
      // todo create error component; navigate[]
      //  this.router.navigate(['/home/error'], {queryParams: {error: "you do not have right to access here"}})
      this.router.navigate(['/home']);
      return false;
    }

    if (!this.auth.isAuthenticated) {
      // this.snackbarService.openSnackBar(GlobalConstants.unauthorize, GlobalConstants.error);
      this.router.navigate(['/']);
      return false;
    }
    return true;

  }

  checkRole(expected: Role[], roles: Role[]): boolean {
    if (!expected || expected.length == 0) {
      return true;
    }
    if (!roles || roles.length == 0) {
      return false;
    }
    const result = roles.find(role => expected.indexOf(role) >= 0);
    return result != null;
  }
}
