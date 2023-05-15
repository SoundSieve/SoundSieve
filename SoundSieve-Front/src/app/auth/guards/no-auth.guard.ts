import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate, CanLoad {

  constructor( private _authService: AuthService,
    private _router: Router ) {  }

  canActivate(): Observable<boolean> | boolean {
    return this.validateSession('/browse');
  }
  canLoad(): Observable<boolean> | boolean {
    return this.validateSession('/browse');
  }

  validateSession(route: string) : Observable<boolean> | boolean {
    if(localStorage.getItem('token')) {
      return this._authService.validateToken()
      .pipe(
        tap( valid => {
          if(valid) {
            this._router.navigateByUrl(route)
          }
        })
      );
    } else {
      return true;
    }
    
  }
}
