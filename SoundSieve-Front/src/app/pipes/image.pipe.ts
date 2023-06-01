import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string | undefined): string {
    if(!img) {
      return `${ base_url }/upload/users/no-image`;
    } else if (img.includes('https')) {
      return img;
    } else if ( img ) {
      return `${ base_url }/upload/users/${ img }`
    } else {
      return `${ base_url }/upload/users/no-image`
    }
  }

}
