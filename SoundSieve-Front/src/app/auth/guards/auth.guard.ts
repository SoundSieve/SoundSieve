import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AuthStatus } from '../interfaces/auth.interface';

/** PrivateGuard - PublicGuard  */

export const AuthGuard: CanActivateFn = (route, state) => {
  
  const _userService = inject( UserService );
  const _router      = inject( Router );

  const url = state.url;
  localStorage.setItem('path', url);

  if ( _userService.authStatus() === AuthStatus.authenticated ) {
    return true;
  }

  _router.navigateByUrl('/auth/sign-up');
  return false;
}
