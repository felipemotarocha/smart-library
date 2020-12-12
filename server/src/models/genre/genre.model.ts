import { Schema, model } from "mongoose";

import { IGenre } from "./genre.model.types";

const genreSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		displayName: {
			type: String,
			required: true,
		},
		authorId: Schema.Types.ObjectId,
	},
	{ toJSON: { virtuals: true } }
);

genreSchema.virtual("books", {
	ref: "Book",
	localField: "_id",
	foreignField: "genre",
});

const Genre = model<IGenre>("Genre", genreSchema);

export default Genre;
