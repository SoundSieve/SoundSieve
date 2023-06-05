import { environment } from '../../environments/environment';

const base_url = environment.baseUrl;

export class User {

    constructor(
        public firstName: string,
        public lastName: string,
        public username: string,
        public email: string,
        public password?: string,
        public bio?: string,
        public occupation?: string,
        public location?: string,
        public city?: string,
        public instruments?: string[],
        public img?: string,
        public google?: boolean,
        public role?: 'ADMIN_ROLE' | 'USER_ROLE',
        public uid?: string,
        public creationTime?: Date,
    ) {}
}
