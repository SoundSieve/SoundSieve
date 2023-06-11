import { User } from "src/app/models/user.model";

export interface SheetUpdateData { 
    name?: string,
    author?: string,
    creationDate?: Date,
    license?: string,
    genres?: string[],
    instruments?: string[],
    description?: string,
    pdfPreview?: string,
    pdf?: string,
    enabled?: boolean,
    uid?: string
}