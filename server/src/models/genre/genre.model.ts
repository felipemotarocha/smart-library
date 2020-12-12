import { Schema, model, Model } from "mongoose";

import { IGenreDocument, IGenreModel } from "./genre.model.types";

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
	},
	{
		toJSON: { virtuals: true },
		id: false,
		versionKey: process.env.NODE_ENV === "test" && false,
	}
);

genreSchema.virtual("books", {
	ref: "Book",
	localField: "_id",
	foreignField: "genre",
});

genreSchema.static(
	"findAllAndPopulateBooksField",
	function (this: Model<IGenreDocument>) {
		return this.find({}).populate("books").exec();
	}
);

genreSchema.static(
	"findByIdAndPopulateBooksField",
	function (this: Model<IGenreDocument>, id: string) {
		return this.findById(id).populate("books").exec();
	}
);

const Genre = model<IGenreDocument, IGenreModel>("Genre", genreSchema);

export default Genre;
