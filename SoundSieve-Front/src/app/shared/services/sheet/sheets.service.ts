import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, of } from 'rxjs';
import { Sheet } from 'src/app/models/sheet.model';
import { environment } from 'src/environments/environment';
import { SheetUpdateData } from '../../interfaces/SheetUpdateData.interface';
import { SheetResponse } from '../../interfaces/SheetResponse.interface';

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

  getSheetById(id: string) {
    const url = `${ base_url }/sheets/${id}`;
    return this._http.get<SheetResponse>( url, this.headers )
    .pipe(
      map( (resp: {ok: boolean, sheet: Sheet }) => resp ) 
      );
  }

  newSheet(uid: string, data: SheetUpdateData) {
    data = {
      ...data,
      uid: uid
    }
    return this._http.post(`${ base_url }/sheets/`, data, this.headers );
  }

  updateSheet( id: string, uid: string, data: SheetUpdateData ) {
    data = {
      ...data,
      uid: uid
    }
    return this._http.put(`${ base_url }/sheets/${ id }`, data, this.headers );
  }

  deleteSheet(id:string) {
      return this._http.delete(`${ base_url }/sheets/${ id }`, this.headers);
  }
}
