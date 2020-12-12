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
		autopopulate: true,
	},
	genre: {
		type: Schema.Types.ObjectId,
		ref: "Genre",
		autopopulate: true,
	},
});

bookSchema.plugin(require("mongoose-autopopulate"));

const Book = model<IBook>("Book", bookSchema);

export default Book;
