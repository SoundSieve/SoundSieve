import { User } from "src/app/models/user.model";
import { Header } from "../components/header/header.interface";

export interface LoginResponse {
    ok: boolean,
    token: string,
    user: User,
    menu: Header
}