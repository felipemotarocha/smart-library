import { Schema, model } from "mongoose";
import { IGenre } from "./genre.model.types";

const genreSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	displayName: {
		type: String,
		required: true,
	},
	authorId: Schema.Types.ObjectId,
});

export default model<IGenre>("Genre", genreSchema);
