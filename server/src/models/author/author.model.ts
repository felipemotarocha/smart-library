import { Schema, model } from "mongoose";

import { IAuthor } from "./author.model.types";

const authorSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
});

const Author = model<IAuthor>("Author", authorSchema);

export default Author;
