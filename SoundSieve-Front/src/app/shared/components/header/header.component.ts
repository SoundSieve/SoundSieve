import { Component, OnInit, Signal, computed, effect, inject, signal } from '@angular/core';
import { Header } from './header.interface';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user/user.service';

import { DEFAULT_HEADER } from './header.config'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public _userService = inject( UserService );
  public isLogged: boolean = false;
  public isSearchPage: boolean = false;
  public headerOptions: Header = DEFAULT_HEADER;
  public currentUrl: string = '';
  public currentUser : User;

  constructor ( private readonly _router: Router ) { 
    this._router.events.subscribe((event) => {
      event instanceof NavigationEnd ? 
        this.currentUrl = event.url : null 
    });
    this.currentUser = this._userService.currentUser();
    this.isLogged = this._userService.isAuthenticated;
  }

  ngOnInit(): void {
  }

  onLogout() {
    this._userService.logout();
  }

}
