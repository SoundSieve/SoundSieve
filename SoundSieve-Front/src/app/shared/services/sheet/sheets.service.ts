import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { Sheet } from 'src/app/models/sheet.model';
import { environment } from 'src/environments/environment';
import { SheetUpdateData } from '../../interfaces/SheetUpdateData.interface';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  constructor( private readonly _http: HttpClient ) { }

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

  getSheets() {
    const url = `${ base_url }/sheets`;
    return this._http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, sheets: Sheet[] }) => resp.sheets )
              );
  }

  updateSheet( id: string, uid: string, data: SheetUpdateData ) {
    data = {
      ...data,
      uid: uid
    }
    return this._http.put(`${ base_url }/sheets/${ id }`, data, this.headers );
  }
}
