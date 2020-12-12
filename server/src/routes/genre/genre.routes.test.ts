import request from "supertest";

import app from "../../app";
import { IBook } from "../../models/book/book.model.types";
import Genre from "../../models/genre/genre.model";

import {
	MOCKED_AUTHOR_ID_STRINGIFIED,
	MOCKED_BOOK,
	MOCKED_BOOK_ID_STRINGFIED,
	MOCKED_GENRE,
	MOCKED_GENRE_ID,
	MOCKED_GENRE_ID_STRINGFIED,
} from "../../utils/tests.utils";

describe("Genre Related Requests", () => {
	describe("POST Requests", () => {
		it("should create a genre", async () => {
			await Genre.deleteMany({});

			await request(app).post("/genres").send(MOCKED_GENRE).expect(201);

			const createdGenre = await Genre.findById(MOCKED_GENRE_ID);
			expect(createdGenre).not.toBeNull();
		});
	});
	describe("GET Requests", () => {
		it("should get all the genres", async () => {
			const { body: genres } = await request(app).get("/genres").expect(200);

			expect(genres).not.toBeNull();
		});
		it("should get all the genres with their books", async () => {
			const { body: genresWithBooks } = await request(app)
				.get("/genres?withBooks=true")
				.expect(200);

			const booksOfTheGenre = genresWithBooks[0].books;
			const firstBookOfTheGenre: IBook = genresWithBooks[0].books[0];

			expect(booksOfTheGenre).toBeDefined();

			expect(firstBookOfTheGenre).toBeDefined();
			expect(firstBookOfTheGenre._id).toStrictEqual(MOCKED_BOOK_ID_STRINGFIED);
			expect(firstBookOfTheGenre.title).toStrictEqual(MOCKED_BOOK.title);
			expect(firstBookOfTheGenre.author).toStrictEqual(
				MOCKED_AUTHOR_ID_STRINGIFIED
			);
			expect(firstBookOfTheGenre.genre).toStrictEqual(
				MOCKED_GENRE_ID_STRINGFIED
			);
		});
	});
});
