import { Sheet } from "src/app/models/sheet.model";
import { User } from "src/app/models/user.model";

export interface SheetResponse {
    ok: boolean,
    sheet: Sheet,
};