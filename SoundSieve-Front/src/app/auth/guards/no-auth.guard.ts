import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AuthStatus } from '../interfaces/auth.interface';

/** PrivateGuard - PublicGuard  */

export const NoAuthGuard: CanActivateFn = (route, state) => {
  
  const _userService = inject( UserService );
  const _router      = inject( Router );

  const url = state.url;
  localStorage.setItem('path', url);


  if ( _userService.authStatus() === AuthStatus.authenticated ) {
      _router.navigateByUrl('/browse');
    return false;
  }

  return true;
};