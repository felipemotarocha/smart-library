import { Document } from "mongoose";
import { IBookDocument } from "../book/book.model.types";

export interface IAuthorDocument extends Document {
	name: string;
	books?: IBookDocument[];
}
