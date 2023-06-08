import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async updateFile(
    file: File,
    type: 'users'| 'sheets',
    user_id: string
  ) {
    try {

      const url = `${ base_url }/upload/image/${ type }/${ user_id }`;
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token'),
        },
        body: formData
      });

      const data = await response.json();
      if( data.ok ) {
        return data.file_name;
      } else {
        console.log(data.msg);
        return false;
      }
      
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
