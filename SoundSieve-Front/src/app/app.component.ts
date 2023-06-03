import { Component, inject } from '@angular/core';
import { UserService } from './shared/services/user/user.service';
import { AuthStatus } from './auth/interfaces/auth.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _userService = inject( UserService );

  public finishedAuthCheck(): boolean {
    if( this._userService.authStatus === AuthStatus.checking) {
      return false;
    }
    return true;
  };
  
}
