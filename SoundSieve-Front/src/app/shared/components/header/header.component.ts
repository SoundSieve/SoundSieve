import { Component } from '@angular/core';
import { MenuItem } from './header.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public publicHeader: MenuItem[] = [
    {
      title: 'Pricing',
      route: ''
    },
    {
      title: 'Signin',
      route: 'auth/sign-in'
    },
    {
      title: 'Signup',
      route: 'auth/sign-up'
    }
  ];

  public privateHeader: MenuItem[] = [
    {
      title: 'My music sheets',
      route: '',
      childs: [
        ''
      ]
    },
  ];

  constructor( 
    private _authService: AuthService, 
  ) { }

  logout() {
    this._authService.logout();
  }
}
