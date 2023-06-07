
export interface UserUpdateData { 
    email?: string,
    username?: string,
    firstName?: string,
    lastName?: string,
    bio?: string,
    ocupation?: string,
    location?: string,
    city?: string,
    instruments?: string[],
    role: 'ADMIN_ROLE' | 'USER_ROLE',
    enabled: boolean,
}