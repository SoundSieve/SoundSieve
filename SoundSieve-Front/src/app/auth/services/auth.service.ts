import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginBody, AuthResponse, User } from './auth.interface';
import { environment } from 'src/environments/environment';
import { catchError, map, of, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _baseUrl: string = environment.baseUrl;
  private _http = inject( HttpClient );
  private _currentUser = signal<User|null>(null);

  get user() {
    return { ...this._currentUser };
  }

  constructor( ) { }

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



  validateToken(): Observable<boolean> {
    const url = `${ this._baseUrl }/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this._http.get<AuthResponse>(url, { headers })
      .pipe(
        map( resp => {
          return resp.ok;
        }),
        catchError( err => of(false))
      )
  }
}
