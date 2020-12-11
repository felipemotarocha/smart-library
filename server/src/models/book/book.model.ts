import { Schema, model } from "mongoose";
import { IBook } from "./book.model.types";

const bookSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	coverImageUrl: {
		type: String,
		required: true,
	},
	author: Schema.Types.ObjectId,
	genre: Schema.Types.ObjectId,
});

const Book = model<IBook>("Book", bookSchema);

export default Book;
