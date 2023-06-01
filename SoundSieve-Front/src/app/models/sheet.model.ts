import { environment } from '../../environments/environment';
import { User } from './user.model';

const base_url = environment.baseUrl;

export class Sheet {


    constructor(
        public name: string,
        public author: User,
        public year: number,
        public license: string,
        public genres: string[],
        public instruments: string[],
        public description?: string,
        public pdf?: string,
    ) {}

    get pdfUrl() {

        if ( !this.pdf ) {
            return `${ base_url }/upload/users/no-sheets-image`;
        } else if ( this.pdf.includes('https') ) {
            return this.pdf;
        } else if ( this.pdf ) {
            return `${ base_url }/upload/users/${ this.pdf }`;
        } else {
            return `${ base_url }/upload/users/no-sheets-image`;
        }
    }
}