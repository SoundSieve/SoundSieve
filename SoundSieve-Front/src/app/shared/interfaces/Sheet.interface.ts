import { User } from "src/app/auth/services/auth.interface";

export interface Sheet {
    name: string,
    author: User,
    description: string,
    year: number,
    license: string,
    pdf?: string,
    genres: string[],
    instruments: string[],
};