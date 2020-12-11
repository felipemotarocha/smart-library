import request from "supertest";

import app from "../../app";
import Book from "../../models/book/book.model";

import {
	MOCKED_AUTHOR_ID,
	MOCKED_BOOK,
	MOCKED_BOOK_ID,
	MOCKED_GENRE_ID,
} from "../../utils/tests.utils";

describe("Books Related Requests", () => {
	describe("Create a book", () => {
		it("should create a book", async () => {
			await Book.deleteMany({});

			await request(app).post("/books").send(MOCKED_BOOK).expect(201);

			const createdBook = await Book.findById(MOCKED_BOOK_ID);
			expect(createdBook).not.toBeNull();
			expect(createdBook!.author).toStrictEqual(MOCKED_AUTHOR_ID);
			expect(createdBook!.genre).toStrictEqual(MOCKED_GENRE_ID);
		});
	});
});
