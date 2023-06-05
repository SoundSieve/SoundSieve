import { Component, computed, effect, inject } from '@angular/core';
import { UserService } from './shared/services/user/user.service';
import { AuthStatus } from './auth/interfaces/auth.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _userService = inject( UserService );
  private _router = inject( Router );
  private forbidenUrls = [
    '/es',
    '/auth/sign-up',
    '/auth/sign-in',
  ]

  public finishedAuthCheck = computed<boolean>( () => {
    if ( this._userService.authStatus() === AuthStatus.checking ) {
      return false;
    }
    return true;
  });

  public authStatusChangedEffect = effect(() => {

    switch( this._userService.authStatus() ) {

      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        return;

      case AuthStatus.notAuthenticated:
        return;
    }
  });
}
