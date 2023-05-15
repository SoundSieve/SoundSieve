
export interface RegisterBody {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    newsletter?: boolean,
    terms: boolean
}

export interface CheckboxOpt {
    id: boolean,
    value: string,
}