import { Component, OnInit, Signal, computed, effect, inject, signal } from '@angular/core';
import { Header } from './header.interface';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user/user.service';

import { DEFAULT_HEADER } from './header.config'
import { AuthStatus } from 'src/app/auth/interfaces/auth.interface';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public readonly _userService = inject( UserService );

  public isSearchPage: boolean = false;
  public isLogged: boolean = false;
  public headerOptions: Header;
  public currentUrl: string = '';
  public currentUser = signal<User|undefined>(undefined);
  public userWasFound = signal(false);

  constructor ( private readonly _router: Router ) { 
    this._router.events.subscribe((event) => {
      event instanceof NavigationEnd ? 
        this.currentUrl = event.url : null 
    });
    this.headerOptions = DEFAULT_HEADER;
  }

  ngOnInit(): void {
    this._router.events.subscribe((val:any) => {
      if(val.url) {
        if(this._userService.authStatus() === AuthStatus.authenticated) {
          this.isLogged = true;
          this.loadUser();
          this._userService.watchStorage().subscribe({
            next: (result) => {
              if(result === 'added'){
                this.headerOptions = JSON.parse(localStorage.getItem('menu'));
              } 
            },
            error: () => {
              this.headerOptions = DEFAULT_HEADER;
            }
          })
          
        } else {
          this.isLogged = false;
        }
      }
    })
  }

  loadUser() {
    this._userService.user.subscribe({
      next: (user) => {
        this.currentUser.update(current => {
          return current = user;
        });
        this.userWasFound.set(true);
      },
      error: () => {
        this.userWasFound.set(false);
        this.currentUser.set(undefined);
      },
    });
  }

  onLogout() {
    this._userService.logout();
  }

}
