import { User } from "src/app/models/user.model";

export interface UsersResponse {
    total: number;
    users: User[];
}