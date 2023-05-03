import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private _http: HttpClient ) { }

  login( password: string, email?: string, username?: string) {
    const body = {
      username: username,
      email: email,
      password: password
    };

    return this._http.post<
  }
}
