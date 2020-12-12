import { Schema, model } from "mongoose";

import { IAuthorDocument } from "./author.model.types";

const authorSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: { virtuals: true },
		id: false,
		versionKey: process.env.NODE_ENV === "test" && false,
	}
);

authorSchema.virtual("books", {
	ref: "Book",
	localField: "_id",
	foreignField: "author",
});

const Author = model<IAuthorDocument>("Author", authorSchema);

export default Author;
