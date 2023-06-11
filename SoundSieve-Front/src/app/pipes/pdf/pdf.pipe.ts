import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;

@Pipe({
  name: 'pdf'
})
export class PdfPipe implements PipeTransform {

  transform(pdf: string | undefined): string {
    if(!pdf) {
      return `${ base_url }/upload/sheets/no-image`;
    } else if (pdf.includes('https')) {
      return pdf;
    } else if ( pdf ) {
      return `${ base_url }/upload/sheets/${ pdf }`
    } else {
      return `${ base_url }/upload/sheets/no-image`
    }
  }

}
