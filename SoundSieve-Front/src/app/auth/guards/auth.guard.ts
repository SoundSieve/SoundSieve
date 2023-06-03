import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AuthStatus } from '../interfaces/auth.interface';

export const AuthGuard: CanActivateFn = (route, state) => {
  
  const _userService = inject( UserService );
  const _router = inject( Router );
  
  const url = state.url;
  localStorage.setItem('path', url);

  
  if( _userService.authStatus === AuthStatus.authenticated ) {
    return true;
  }

  console.log({ status: _userService.authStatus });
  _router.navigateByUrl('/auth/login');
  return false;
}
