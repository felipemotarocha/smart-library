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
	authorId: Schema.Types.ObjectId,
});

export default model<IBook>("Book", bookSchema);
