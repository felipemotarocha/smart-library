import { Schema, model } from "mongoose";

import { IAuthor } from "./author.model.types";

const authorSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
	},
	{ toJSON: { virtuals: true } }
);

authorSchema.virtual("books", {
	ref: "Book",
	localField: "_id",
	foreignField: "author",
});

const Author = model<IAuthor>("Author", authorSchema);

export default Author;
