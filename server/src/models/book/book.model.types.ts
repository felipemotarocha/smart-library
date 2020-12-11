import { Document } from "mongoose";
import { IAuthor } from "../author/author.model.types";
import { IGenre } from "../genre/genre.model.types";

export interface IBook extends Document {
	title: string;
	coverImageUrl: string;
	author: IAuthor["_id"];
	genre: IGenre["_id"];
}
