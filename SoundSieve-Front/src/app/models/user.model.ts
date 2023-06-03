import { environment } from '../../environments/environment';

const base_url = environment.baseUrl;

export class User {

    constructor(
        public firstName: string,
        public lastName: string,
        public username: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: 'ADMIN_ROLE' | 'USER_ROLE',
        public uid?: string,
    ) {}

    get imagenUrl() {

        if ( !this.img ) {
            return `${ base_url }/upload/users/no-user-image`;
        } else if ( this.img.includes('https') ) {
            return this.img;
        } else if ( this.img ) {
            return `${ base_url }/upload/users/${ this.img }`;
        } else {
            return `${ base_url }/upload/users/no-user-image`;
        }
    }
}