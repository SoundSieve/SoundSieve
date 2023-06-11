import { environment } from '../../environments/environment';
import { Author } from '../shared/interfaces/Author.interface';

const base_url = environment.baseUrl;

export class Sheet {

    constructor(
        public id: string,
        public name: string,
        public author: Author,
        public creationDate: Date,
        public license: string,
        public genres: string[],
        public instruments: string[],
        public description?: string,
        public pdfPreview?: string,
        public pdf?: string,
    ) {}

}