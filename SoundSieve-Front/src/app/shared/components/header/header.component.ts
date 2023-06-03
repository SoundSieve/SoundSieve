import { Component, OnInit, inject } from '@angular/core';
import { Header } from './header.interface';
import { NavigationEnd, Router } from '@angular/router';
import { HeaderService } from '../../services/header/header.service';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user/user.service';

import { DEFAULT_HEADER } from './header.config'
import { AuthStatus } from 'src/app/auth/interfaces/auth.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public readonly _userService = inject( UserService );

  public isSearchPage: boolean = false;
  public currentUrl: string = '';
  public currentStatus: Observable<boolean> = this._userService.checkAuthStatus();
  public isToken: boolean;
  public headerOptions: Header;

  constructor ( private readonly _router: Router,
                private readonly _header: HeaderService ) { 
    this._router.events.subscribe((event) => {
      event instanceof NavigationEnd ? 
        this.currentUrl = event.url : null 
    })
    this.headerOptions = DEFAULT_HEADER;
  }

  ngOnInit(): void {

  }
}
