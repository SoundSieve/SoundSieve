import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone, inject } from '@angular/core';
import { LoginBody, AuthResponse, User } from './auth.interface';
import { RegisterBody } from './../interfaces/register.interface';
import { environment } from 'src/environments/environment';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { Router } from '@angular/router';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _baseUrl: string = environment.baseUrl;
  private _http = inject( HttpClient );
  private _router = inject( Router );
  private _ngZone = inject( NgZone )
  private _currentUser! : User;

  public auth2: any;

  get user() {
    return { ...this._currentUser };
  }

  constructor() {
  }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this._ngZone.run(() => {
        this._router.navigateByUrl('/auth/login');
      })
    });
    this._router.navigateByUrl('/auth/sign-up');
      
  }

  login( email: string, password: string) {

    const url = `${ this._baseUrl }/auth/login`;
    const body: LoginBody = { email, password };

    return this._http.post<AuthResponse>(url, body)
      .pipe(
        tap( resp => {
          if(resp.ok) {
            localStorage.setItem('token', resp.token!);
            this._currentUser = {
              firstName: resp.firstName,
              lastName: resp.lastName,
              uid: resp.uid!,
            }
          }
        }),
        map( resp => resp.ok),
        catchError( err => of(err))
      );
  }

  googleLogin( token: string ) {
    const url = `${ this._baseUrl }/auth/login/google`;
    const headers = new HttpHeaders()
    .set('token', token);
    return this._http.post<AuthResponse>(url, { headers })
      .pipe(
        tap( resp => {
          if(resp.ok) {
            localStorage.setItem('token', resp.token!);
            this._currentUser = {
              firstName: resp.firstName,
              lastName: resp.lastName,
              uid: resp.uid!,
            }
          }
        }),
        map( resp => resp.ok),
        catchError( err => of(err))
      );
  }

  register( body: RegisterBody ) {
    const url = `${ this._baseUrl }/auth/new`;
    console.log(body);
    return this._http.post<AuthResponse>(url, body)
      .pipe(
        tap( resp => {
          if(resp.ok) {
            localStorage.setItem('token', resp.token!);
            this._currentUser = {
              firstName: resp.firstName,
              lastName: resp.lastName,
              uid: resp.uid!,
            }
          }
        }),
        map( resp => resp.ok),
        catchError( err => of(err))
      );
  }

  validateToken(): Observable<boolean> {
    const url = `${ this._baseUrl }/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this._http.get<AuthResponse>(url, { headers })
      .pipe(
        map( resp => {
          localStorage.setItem('token', resp.token!);
          return resp.ok;
        }),
        catchError( err => of(false))
      )
  }
}