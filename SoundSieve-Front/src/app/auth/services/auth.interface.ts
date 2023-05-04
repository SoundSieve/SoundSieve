
export interface LoginBody {
    email: string,
    password: string
};

export interface AuthResponse {
    "ok": boolean,
    "uid"?: string,
    "firstName"?: string,
    "lastName"?: string,
    "token"?: string,
    "msg"?: string,
}

export interface User {
    uid: string,
    firstName?: string,
    lastName?: string,
}