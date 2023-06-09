import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

import { environment } from '../../../../environments/environment';
import { UsersResponse } from '../../interfaces/UsersResponse.interface';
import { UserResponse } from '../../interfaces/UserResponse.interface';
import { BehaviorSubject, Observable, Subject, catchError, map, of, tap, throwError } from 'rxjs';
import { RegisterForm } from '../../interfaces/RegisterForm.interface';
import { LoginForm } from '../../interfaces/LoginForm.interface';
import { Header } from '../../components/header/header.interface';
import { AuthStatusResponse } from '../../interfaces/AuthStatusResponse.interface';
import { LoginResponse } from '../../interfaces/LoginResponse.interface';
import { RegisterResponse } from '../../interfaces/RegisterResponse,interface';
import { UserUpdateData } from '../../interfaces/UserUpdateData.interface';
import Swal from 'sweetalert2';

const base_url = environment.baseUrl;
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _http = inject( HttpClient ); 
  private readonly router = inject( Router );
  private readonly ngZone = inject( NgZone );

  public auth2: any;
  private storageSub= new Subject<string>();
  private _currentUser = signal<User|null>(null);


  public currentUser = computed( () => this._currentUser());
  public isAuthenticated: boolean = false;

  constructor() {
    this.checkAuthStatus().subscribe()
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

  saveLocalStorage( token: string, menu: any ) {
    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu) );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this._currentUser.set(null);
    this.isAuthenticated = false;
    google.accounts.id.revoke( this.currentUser().email, () => {
      Swal.fire('Logout!', 'See you soon!', 'info');
      setTimeout(() => {
        this.router.navigateByUrl('/auth/sign-up');
      }, 2000);
    })
    Swal.fire('Logout!', 'See you soon!', 'info');
    setTimeout(() => {
      this.router.navigateByUrl('/auth/sign-up');
    }, 2000);
  }

  checkAuthStatus(): Observable<boolean> {
    const token = this.token;
    if(!token) {
      this.isAuthenticated = false;
      return of(false);
    }

    return this._http.get<AuthStatusResponse>(`${ base_url }/auth/renew`, this.headers)
                .pipe(
                  map(({user, token, menu}) => this.setAuthentication(user, token, menu)),
                  catchError(error => {
                    this.isAuthenticated = false;
                    console.log(error); 
                    return of(false);
                  })
                );
  }

  login( formData: LoginForm ): Observable<boolean> {
    return this._http.post<LoginResponse>(`${ base_url }/auth/login`, formData )
                .pipe(
                  map( ({user, token, menu}) => this.setAuthentication(user, token, menu)),
                  catchError( err => {
                    this.isAuthenticated = false;
                    return throwError(() => err.error );
                  })
                );
  }

  loginGoogle( token: string ) {
    return this._http.post<LoginResponse>(`${ base_url }/auth/login/google`, { token } )
                .pipe(
                  map( ({user, token, menu}) => this.setAuthentication(user, token, menu)),
                  catchError( err => {
                    this.isAuthenticated = false;
                    return throwError(() => err.error );
                  })
                );
  }

  newUser( formData: RegisterForm ) {
    return this._http.post<RegisterResponse>(`${ base_url }/auth/new`, formData )
              .pipe(
                map( ({user, token, menu}) => this.setAuthentication(user, token, menu)),
                catchError( err => {
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
    return this._http.get<UserResponse>( url, this.headers )
    .pipe(
      map( resp => new User(
        resp.user?.firstName || '',
        resp.user?.lastName || '',
        resp.user?.username || '',
        resp.user?.email || '',
        '',
        resp.user?.bio || '',
        resp.user?.ocupation || '',
        resp.user?.location|| '',
        resp.user?.city || '',
        resp.user?.instruments || [''],
        resp.user?.img || '',
        resp.user?.google,
        resp.user?.role,
        resp.user?.uid,
        resp.user?.creationTime as Date || new Date()
      ))
    )
  }

  deleteUser( uid: string, data: UserUpdateData ) {
    data = {
      ...data,
      enabled: false,
    }
    this.updateUser( uid, data );
  }

  updateUser( uid: string, data: UserUpdateData ) {
    data = {
      ...data,
      // role: this.currentUser.role
    }
    return this._http.put(`${ base_url }/users/${ uid }`, data, this.headers );
  }

  private setAuthentication( user: User, token: string, menu: Header ): boolean {
    this._currentUser.set(user);
    this.saveLocalStorage( token, menu );
    this.isAuthenticated = true;
    return true;
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }
}
