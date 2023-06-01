import { Component } from '@angular/core';
import { MenuItem } from './header.interface';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public isSearchPage: boolean = false;

  constructor ( private _router: Router ) { 
    this._router.events.subscribe((event) => {
      event instanceof NavigationEnd ? console.log(event.url): null 
    })
  }


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
