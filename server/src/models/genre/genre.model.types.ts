import { Document } from "mongoose";

import { IBook } from "../book/book.model.types";

export interface IGenre extends Document {
	name: string;
	displayName: string;
	books: IBook[];
}
