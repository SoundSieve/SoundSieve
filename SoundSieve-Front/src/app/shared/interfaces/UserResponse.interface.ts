import { User } from "src/app/models/user.model";

export interface UserResponse {
    msg: string,
    user: User;
}