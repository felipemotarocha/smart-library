import { Types } from "mongoose";

import Book from "../models/book/book.model";
import Genre from "../models/genre/genre.model";
import Author from "../models/author/author.model";

export const MOCKED_GENRE_ID = new Types.ObjectId();
export const MOCKED_GENRE = {
	_id: MOCKED_GENRE_ID,
	name: "biography",
	displayName: "Biography",
};

export const MOCKED_AUTHOR_ID = new Types.ObjectId();
export const MOCKED_AUTHOR = {
	_id: MOCKED_AUTHOR_ID,
	name: "Walter Isaacson",
};

export const MOCKED_BOOK_ID = new Types.ObjectId();
export const MOCKED_BOOK = {
	_id: MOCKED_BOOK_ID,
	title: "Steve Jobs",
	coverImageUrl:
		"https://lojasaraiva.vteximg.com.br/arquivos/ids/9199711/1008970422.jpg?v=637103746125800000",
	author: MOCKED_AUTHOR_ID,
	genre: MOCKED_GENRE_ID,
};

export const setupDatabase = async () => {
	await Book.deleteMany({});
	await Genre.deleteMany({});
	await Author.deleteMany({});

	await new Book(MOCKED_BOOK).save();
	await new Genre(MOCKED_GENRE).save();
	await new Author(MOCKED_AUTHOR).save();
};
