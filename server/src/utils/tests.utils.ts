import { Types } from "mongoose";
import faker from "faker";

import Book from "../models/book/book.model";
import Genre from "../models/genre/genre.model";
import Author from "../models/author/author.model";

export const MOCKED_GENRE_ID = new Types.ObjectId();
export const MOCKED_GENRE_ID_STRINGFIED = MOCKED_GENRE_ID.toString();
export const MOCKED_GENRE = {
	_id: MOCKED_GENRE_ID,
	name: faker.lorem.word(7),
	displayName: faker.lorem.word(7),
};

export const MOCKED_AUTHOR_ID = new Types.ObjectId();
export const MOCKED_AUTHOR_ID_STRINGIFIED = MOCKED_AUTHOR_ID.toString();
export const MOCKED_AUTHOR = {
	_id: MOCKED_AUTHOR_ID,
	name: faker.name.firstName(),
};

export const MOCKED_BOOK_ID = new Types.ObjectId();
export const MOCKED_BOOK_ID_STRINGFIED = MOCKED_BOOK_ID.toString();
export const MOCKED_BOOK = {
	_id: MOCKED_BOOK_ID,
	title: faker.name.title(),
	coverImageUrl: faker.image.imageUrl(),
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
