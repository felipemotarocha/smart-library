import { Document } from "mongoose";
import { IAuthor } from "../author/author.model.types";
import { IGenre } from "../genre/genre.model.types";

export interface IBook extends Document {
	title: string;
	coverImageUrl: string;
	authorId: IAuthor["_id"];
	genreId: IGenre["_id"];
}
