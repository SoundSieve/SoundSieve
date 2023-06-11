import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from 'src/app/shared/services/user/user.service';

/** PublicGuard - PrivateGuard  */
@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  private forbiddenRoutes = [
    '/es',
    '/auth/login',
    '/auth/sign-in'
  ]

  constructor( 
              private _userService: UserService,
              private _router: Router 
              ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      return this._userService.checkAuthStatus()
      .pipe(
        tap( isAuth => {
          if( isAuth ) {
            console.log(isAuth)
            this._router.navigateByUrl('/browse');
          }
        })
      );
      
  }
}