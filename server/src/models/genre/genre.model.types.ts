import { Document, Model } from "mongoose";

import { IBookDocument } from "../book/book.model.types";

export interface IGenreDocument extends Document {
	name: string;
	displayName: string;
	books: IBookDocument[];
}

export interface IGenreModel extends Model<IGenreDocument> {
	findByIdAndPopulateBooksField: (id: string) => Promise<any>;
	findAllAndPopulateBooksField: () => Promise<any>;
}
