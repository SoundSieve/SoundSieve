import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

import { environment } from '../../../../environments/environment';
import { UsersResponse } from '../../interfaces/UsersResponse.interface';
import { UserResponse } from '../../interfaces/UserResponse.interface';
import { Observable, Subject, catchError, map, of, tap, throwError } from 'rxjs';
import { RegisterForm } from '../../interfaces/RegisterForm.interface';
import { LoginForm } from '../../interfaces/LoginForm.interface';
import { AuthStatus } from 'src/app/auth/interfaces/auth.interface';
import { Header } from '../../components/header/header.interface';
import { AuthStatusResponse } from '../../interfaces/AuthStatusResponse.interface';
import { LoginResponse } from '../../interfaces/LoginResponse.interface';
import { RegisterResponse } from '../../interfaces/RegisterResponse,interface';
import { UserUpdateData } from '../../interfaces/UserUpdateData.interface';

const base_url = environment.baseUrl;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  private storageSub= new Subject<string>();
  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed( () => this._currentUser());
  public authStatus = computed( () => this._authStatus());

  constructor( private readonly _http: HttpClient, 
                private readonly router: Router,
                private readonly ngZone: NgZone ) { 
                  // this.googleInit();
                  this.checkAuthStatus().subscribe();
                 }

  get user(): Observable<User> {
    return of(this._currentUser());
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  // googleInit() {
  //   return new Promise<void>( resolve => {
  //     gapi.load('auth2', () => {
  //       this.auth2 = gapi.auth2.init({
  //         client_id: '1045072534136-oqkjcjvo449uls0bttgvl3aejelh22f5.apps.googleusercontent.com',
  //         cookiepolicy: 'single_host_origin',
  //       });
  //       resolve();
  //     });
  //   })
  // }

  saveLocalStorage( token: string, menu: any ) {
    this.setItem('token', token );
    this.setItem('menu', JSON.stringify(menu) );
  }

  logout() {
    this.removeItem('token');
    this.removeItem('menu');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    this.router.navigateByUrl('/auth/sign-up');
    
    // this.auth2.signOut().then(() => {
    //   this.ngZone.run(() => {
    //     this.router.navigateByUrl('/login');
    //   })
    // });

  }

  checkAuthStatus(): Observable<boolean> {
    if(!this.token) {
      this._authStatus.set(AuthStatus.notAuthenticated);
      return of(false);
    } else {

      const url = `${ base_url }/auth/renew`;
      
      return this._http.get<AuthStatusResponse>( url, this.headers ).pipe(
        map( ({user, token, menu}) => this.setAuthentication(user, token, menu)),
        catchError( error => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false); 
        })
      );
    }
  }

  login( formData: LoginForm ): Observable<boolean> {
    return this._http.post<LoginResponse>(`${ base_url }/auth/login`, formData )
                .pipe(
                  map( ({user, token, menu}) => this.setAuthentication(user, token, menu)),
                  catchError( err => {
                    this._authStatus.set(AuthStatus.notAuthenticated);
                    return throwError(() => err.error );
                  })
                );
  }

  loginGoogle( token ) {
    return this._http.post<LoginResponse>(`${ base_url }/auth/login/google`, { token } )
                .pipe(
                  map( ({user, token, menu}) => this.setAuthentication(user, token, menu)),
                  catchError( err => {
                    this._authStatus.set(AuthStatus.notAuthenticated);
                    return throwError(() => err.error );
                  })
                );
  }

  newUser( formData: RegisterForm ) {
    return this._http.post<RegisterResponse>(`${ base_url }/auth/new`, formData )
              .pipe(
                map( ({user, token, menu}) => this.setAuthentication(user, token, menu)),
                catchError( err => {
                  this._authStatus.set(AuthStatus.notAuthenticated);
                  return throwError(() => err.error );
                })
              );
  }
  
  getUsers( offset: number = 0 ) {
    const url = `${ base_url }/users?offset=${ offset }`;
    return this._http.get<UsersResponse>( url, this.headers )
            .pipe(
              map( resp => {
                const users = resp.users.map( 
                  user => new User( user.firstName, user.lastName, user.username, user.email,'', user.img, user.bio, user.ocupation, user.location, user.instruments, user.city, user.google, user.role, user.uid, user.creationTime )  
                );
                return {
                  total: resp.total,
                  users
                };
              })
            )
  }

  getUserById(uid: string) {
    const url = `${ base_url }/users/${uid}`;
    return this._http.get<UserResponse>( url, this.headers );
  }

  deleteUser( user: User ) {
    const url = `${ base_url }/usuarios/${ user.uid }`;
    return this._http.delete( url, this.headers );
  }

  updateUser( uid: string, data: UserUpdateData ) {
    data = {
      ...data,
      // role: this.currentUser.role
    }
    return this._http.put(`${ base_url }/users/${ uid }`, data, this.headers );
  }

  saveUser( user: User ) {
    return this._http.put(`${ base_url }/users/${ user.uid }`, user, this.headers );
  }

  private setAuthentication( user: User, token: string, menu: Header ): boolean {
    this._authStatus.set(AuthStatus.authenticated);
    this._currentUser.set(user);
    this.saveLocalStorage( token, menu );
    return true;
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next('added');
  }

  removeItem(key) {
    localStorage.removeItem(key);
    this.storageSub.next('removed');
  }

  get imageUrl() {

    if ( !this.currentUser().img ) {
        return `${ base_url }/upload/users/no-user-image`;
    } else if ( this.currentUser().img.includes('https') ) {
        return this.currentUser().img;
    } else if ( this.currentUser().img ) {
        return `${ base_url }/upload/users/${ this.currentUser().img }`;
    } else {
        return `${ base_url }/upload/users/no-user-image`;
    }
  }
}
