import request from "supertest";

import app from "../../app";

import Genre from "../../models/genre/genre.model";
import {
	Genre as GenreType,
	GenreWithBooksPopulated as GenreWithBooksPopulatedType,
} from "../../types/genre.types";

import {
	MOCKED_AUTHOR_WITH_ID_STRINGFIED,
	MOCKED_BOOK,
	MOCKED_BOOK_ID_STRINGFIED,
	MOCKED_GENRE,
	MOCKED_GENRE_ID,
	MOCKED_GENRE_ID_STRINGFIED,
	MOCKED_GENRE_WITH_ID_STRINGFIED,
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

			const firstGenre: GenreType = genres[0];

			expect(genres).not.toBeNull();
			expect(firstGenre).toStrictEqual(MOCKED_GENRE_WITH_ID_STRINGFIED);
		});
		it("should get all the genres with their books", async () => {
			const {
				body: genresWithBooks,
			}: { body: GenreWithBooksPopulatedType[] } = await request(app)
				.get("/genres?withBooks=true")
				.expect(200);

			const booksOfTheGenre = genresWithBooks[0].books;
			const firstBookOfTheGenre = genresWithBooks[0].books[0];

			expect(booksOfTheGenre).toBeDefined();

			expect(firstBookOfTheGenre).toBeDefined();
			expect(firstBookOfTheGenre._id).toStrictEqual(MOCKED_BOOK_ID_STRINGFIED);
			expect(firstBookOfTheGenre.title).toStrictEqual(MOCKED_BOOK.title);
			expect(firstBookOfTheGenre.author).toStrictEqual(
				MOCKED_AUTHOR_WITH_ID_STRINGFIED
			);
			expect(firstBookOfTheGenre.genre).toStrictEqual(
				MOCKED_GENRE_WITH_ID_STRINGFIED
			);
		});
		it("should get a genre by id", async () => {
			const { body: genre }: { body: GenreType } = await request(app)
				.get(`/genres/${MOCKED_GENRE_ID_STRINGFIED}`)
				.expect(200);

			expect(genre).toBeDefined();
			expect(genre).toStrictEqual(MOCKED_GENRE_WITH_ID_STRINGFIED);
		});
		it("should get a genre by id and its books", async () => {
			const {
				body: genreWithBooks,
			}: { body: GenreWithBooksPopulatedType } = await request(app)
				.get(`/genres/${MOCKED_GENRE_ID_STRINGFIED}?withBooks=true`)
				.expect(200);

			const firstBookOfTheGenre = genreWithBooks.books[0];

			expect(genreWithBooks).toBeDefined();

			expect(genreWithBooks._id).toStrictEqual(MOCKED_GENRE_ID_STRINGFIED);
			expect(genreWithBooks.name).toStrictEqual(MOCKED_GENRE.name);
			expect(genreWithBooks.displayName).toStrictEqual(
				MOCKED_GENRE.displayName
			);
			expect(firstBookOfTheGenre._id).toStrictEqual(MOCKED_BOOK_ID_STRINGFIED);
			expect(firstBookOfTheGenre.title).toStrictEqual(MOCKED_BOOK.title);
			expect(firstBookOfTheGenre.coverImageUrl).toStrictEqual(
				MOCKED_BOOK.coverImageUrl
			);
			expect(firstBookOfTheGenre.author).toStrictEqual(
				MOCKED_AUTHOR_WITH_ID_STRINGFIED
			);
			expect(firstBookOfTheGenre.genre).toStrictEqual(
				MOCKED_GENRE_WITH_ID_STRINGFIED
			);
		});
	});
});
