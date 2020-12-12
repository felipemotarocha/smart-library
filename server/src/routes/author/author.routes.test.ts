import request from "supertest";

import app from "../../app";

import Author from "../../models/author/author.model";
import {
	Author as AuthorType,
	AuthorWithBooksPopulated as AuthorWithBooksPopulatedType,
} from "../../types/author.types";
import {
	MOCKED_AUTHOR,
	MOCKED_AUTHOR_ID,
	MOCKED_AUTHOR_ID_STRINGIFIED,
	MOCKED_AUTHOR_WITH_ID_STRINGFIED,
	MOCKED_BOOK,
	MOCKED_BOOK_ID_STRINGFIED,
	MOCKED_GENRE_WITH_ID_STRINGFIED,
} from "../../utils/tests.utils";

describe("Author Related Requests", () => {
	describe("POST Requests", () => {
		it("should create an author", async () => {
			await Author.deleteMany({});

			await request(app).post("/authors").send(MOCKED_AUTHOR).expect(201);

			const createdAuthor = await Author.findById(MOCKED_AUTHOR_ID);
			expect(createdAuthor).not.toBeNull();
		});
	});
	describe("GET Requests", () => {
		it("should get all the authors", async () => {
			const { body: authors }: { body: AuthorType[] } = await request(app)
				.get("/authors")
				.expect(200);

			const firstAuthor = authors[0];

			expect(authors).toBeDefined();
			expect(firstAuthor).toBeDefined();
			expect(firstAuthor).toStrictEqual(MOCKED_AUTHOR_WITH_ID_STRINGFIED);
		});
		it("should get all the authors with their books", async () => {
			const {
				body: authors,
			}: { body: AuthorWithBooksPopulatedType[] } = await request(app)
				.get("/authors?withBooks=true")
				.expect(200);

			const firstAuthor = authors[0];
			const firstAuthorFirstBook = firstAuthor.books[0];

			expect(authors).toBeDefined();

			expect(firstAuthor).toBeDefined();
			expect(firstAuthor._id).toBe(MOCKED_AUTHOR_ID_STRINGIFIED);
			expect(firstAuthor.name).toBe(MOCKED_AUTHOR.name);

			expect(firstAuthorFirstBook._id).toBe(MOCKED_BOOK_ID_STRINGFIED);
			expect(firstAuthorFirstBook.title).toBe(MOCKED_BOOK.title);
			expect(firstAuthorFirstBook.coverImageUrl).toBe(
				MOCKED_BOOK.coverImageUrl
			);
			expect(firstAuthorFirstBook.title).toBe(MOCKED_BOOK.title);
			expect(firstAuthorFirstBook.author).toStrictEqual(
				MOCKED_AUTHOR_WITH_ID_STRINGFIED
			);
			expect(firstAuthorFirstBook.genre).toStrictEqual(
				MOCKED_GENRE_WITH_ID_STRINGFIED
			);
		});
	});
});
