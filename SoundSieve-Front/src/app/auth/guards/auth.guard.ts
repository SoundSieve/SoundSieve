import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from 'src/app/shared/services/user/user.service';

/** PrivateGuard - PublicGuard  */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

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
        if( !isAuth ) {
          this._router.navigateByUrl('auth/sign-up');
        }
      })
    );
  }
}
