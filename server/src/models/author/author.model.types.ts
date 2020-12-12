import { Document } from "mongoose";
import { IBook } from "../book/book.model.types";

export interface IAuthor extends Document {
	name: string;
	books?: IBook[];
}
