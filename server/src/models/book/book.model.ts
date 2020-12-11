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
	author: {
		type: Schema.Types.ObjectId,
		ref: "Author",
	},
	genre: {
		type: Schema.Types.ObjectId,
		ref: "Genre",
	},
});

const Book = model<IBook>("Book", bookSchema);

export default Book;
