import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from 'src/app/models/user.model';
import { Sheet } from 'src/app/models/sheet.model';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor( private _http: HttpClient ) { }

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

  private transformUsers( results: any[] ): User[] {

    return results.map(
      user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid )  
    );
  }

  private transformSheets( results: any[] ): Sheet[] {
    return results;
  }

  globalSearch( query: string ) {

    const url = `${ base_url }/search/all/${query}`;
    return this._http.get( url, this.headers );

  }

  search( 
    type: 'users'|'sheets',
    query: string
  ) {

  const url = `${ base_url }/search/collection/${ type }/${ query }`;
  return this._http.get<any[]>( url, this.headers )
          .pipe(
            map( (resp: any ) => { 

              switch ( type ) {
                case 'users':
                  return this.transformUsers( resp.results );

                case 'sheets':
                  return this.transformSheets( resp.results );

                default:
                  return [];
              }

            })
          );

}
}
