import request from "supertest";
import faker from "faker";

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

			await request(app)
				.post("/books")
				.send({ ...MOCKED_BOOK })
				.expect(201);

			const createdBook = await Book.findById(MOCKED_BOOK_ID);

			expect(createdBook).not.toBeNull();
			expect(createdBook!.author._id).toStrictEqual(MOCKED_AUTHOR_ID);
			expect(createdBook!.genre._id).toStrictEqual(MOCKED_GENRE_ID);
		});
		it("should not create a book when an invalid author is provided", async () => {
			await Book.deleteMany({});

			await request(app)
				.post("/books")
				.send({ ...MOCKED_BOOK, author: faker.random.uuid })
				.expect(500);
		});
		it("should not create a book when an invalid genre is provided", async () => {
			await Book.deleteMany({});

			await request(app)
				.post("/books")
				.send({ ...MOCKED_BOOK, genre: faker.random.uuid })
				.expect(500);
		});
		it("should not create a book when an invalid author and genre is provided", async () => {
			await Book.deleteMany({});

			await request(app)
				.post("/books")
				.send({
					...MOCKED_BOOK,
					author: faker.random.uuid,
					genre: faker.random.uuid,
				})
				.expect(500);
		});
	});
});
