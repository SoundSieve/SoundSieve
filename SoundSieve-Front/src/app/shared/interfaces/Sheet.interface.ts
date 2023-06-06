import { User } from "src/app/models/user.model";

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