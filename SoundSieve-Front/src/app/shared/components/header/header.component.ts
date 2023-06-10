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
  public isLogged: boolean = true;
  public isSearchPage: boolean = false;
  public headerOptions: Header;
  public currentUrl: string = '';
  public currentUser : User;

  constructor ( private readonly _router: Router ) { 
    this._router.events.subscribe((event) => {
      event instanceof NavigationEnd ? 
        this.currentUrl = event.url : null 
    });
    this.headerOptions = DEFAULT_HEADER;
  }

  ngOnInit(): void {
    // this._router.events.subscribe((val:any) => {
    //   if(val.url) {
    //     if(this._userService.isLoggedIn ) {
    //       this._userService.watchStorage().subscribe({
    //         next: (result) => {
    //           if(result === 'added'){
    //             this.headerOptions = JSON.parse(localStorage.getItem('menu'));
    //           } 
    //         },
    //         error: () => {
    //           this.headerOptions = DEFAULT_HEADER;
    //         }
    //       })
    //     }
    //   }
    // })
  }

  onLogout() {
    this._userService.logout();
  }

}
