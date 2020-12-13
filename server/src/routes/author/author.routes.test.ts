import request from "supertest";
import faker from "faker";

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
		describe("PATCH Requests", () => {
			it("should update an author", async () => {
				const updatedName = faker.name.title();

				const { body: updatedAuthor }: { body: AuthorType } = await request(app)
					.patch(`/authors/${MOCKED_AUTHOR_ID_STRINGIFIED}`)
					.send({
						name: updatedName,
					})
					.expect(200);

				expect(updatedAuthor._id).toStrictEqual(MOCKED_AUTHOR_ID_STRINGIFIED);
				expect(updatedAuthor.name).toBe(updatedName);
			});
			it("should not update an author when an invalid field is provided", async () => {
				await request(app)
					.patch(`/authors/${MOCKED_AUTHOR_ID_STRINGIFIED}`)
					.send({
						invalidField: faker.lorem.word(7),
					})
					.expect(500);
			});
		});
		describe("DELETE Requests", () => {
			it("should delete an author", async () => {
				const { body: deletedAuthor }: { body: AuthorType } = await request(app)
					.delete(`/authors/${MOCKED_AUTHOR_ID_STRINGIFIED}`)
					.expect(200);

				expect(deletedAuthor._id).toStrictEqual(MOCKED_AUTHOR_ID_STRINGIFIED);
				expect(deletedAuthor.name).toBe(MOCKED_AUTHOR.name);
				expect(await Author.findById(MOCKED_AUTHOR_ID_STRINGIFIED)).toBeNull();
			});
		});
	});
});
