import { Component } from '@angular/core';
import { MenuItem } from './header.interface';

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
}
