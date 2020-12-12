import { Document } from "mongoose";

import { IAuthorDocument } from "../author/author.model.types";
import { IGenreDocument } from "../genre/genre.model.types";

export interface IBookDocument extends Document {
	title: string;
	coverImageUrl: string;
	author: IAuthorDocument;
	genre: IGenreDocument;
}
