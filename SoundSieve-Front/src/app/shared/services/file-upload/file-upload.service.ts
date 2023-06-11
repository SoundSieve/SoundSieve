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
    fileType: 'img' | 'pdf',
    id: string
  ) {
    try {
      let url;
      let formData = new FormData();
      if(fileType === 'img') {
        url = `${ base_url }/upload/image/${ type }/${ id }`;
        formData.append('image', file);
      } else if(fileType === 'pdf') {
        url = `${ base_url }/upload/pdf/${ type }/${ id }`;
        formData.append('file', file);
      } else {
        return false;
      }
      
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
