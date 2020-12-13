import request from "supertest";
import faker from "faker";

import app from "../../app";
import Book from "../../models/book/book.model";

import {
	MOCKED_AUTHOR_ID,
	MOCKED_AUTHOR_ID_STRINGIFIED,
	MOCKED_AUTHOR_WITH_ID_STRINGFIED,
	MOCKED_BOOK,
	MOCKED_BOOK_ID,
	MOCKED_BOOK_ID_STRINGFIED,
	MOCKED_GENRE_ID,
	MOCKED_GENRE_ID_STRINGFIED,
	MOCKED_GENRE_WITH_ID_STRINGFIED,
} from "../../utils/tests.utils";
import { Book as BookType } from "../../types/book.types";

describe("Books Related Requests", () => {
	describe("POST Requests", () => {
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
	describe("GET Requests", () => {
		it("should get all the books", async () => {
			const { body: books }: { body: BookType[] } = await request(app).get(
				"/books"
			);

			const firstBook = books[0];

			expect(books).toBeDefined();
			expect(firstBook).toBeDefined();
			expect(firstBook._id).toStrictEqual(MOCKED_BOOK_ID_STRINGFIED);
			expect(firstBook.title).toStrictEqual(MOCKED_BOOK.title);
			expect(firstBook.coverImageUrl).toStrictEqual(MOCKED_BOOK.coverImageUrl);
			expect(firstBook.author).toStrictEqual(MOCKED_AUTHOR_WITH_ID_STRINGFIED);
			expect(firstBook.genre).toStrictEqual(MOCKED_GENRE_WITH_ID_STRINGFIED);
		});
		it("should get a book by id", async () => {
			const { body } = await request(app).get(
				`/books?${MOCKED_BOOK_ID_STRINGFIED}`
			);

			const book: BookType = body[0];

			expect(book).toBeDefined();
			expect(book._id).toStrictEqual(MOCKED_BOOK_ID_STRINGFIED);
			expect(book.title).toStrictEqual(MOCKED_BOOK.title);
			expect(book.coverImageUrl).toStrictEqual(MOCKED_BOOK.coverImageUrl);
			expect(book.author).toStrictEqual(MOCKED_AUTHOR_WITH_ID_STRINGFIED);
			expect(book.genre).toStrictEqual(MOCKED_GENRE_WITH_ID_STRINGFIED);
		});
	});
	describe("PATCH Requests", () => {
		it("should update a book", async () => {
			const updatedTitle = faker.name.title();
			const updatedCoverImageUrl = faker.image.imageUrl();

			const { body: updatedBook }: { body: BookType } = await request(app)
				.patch(`/books/${MOCKED_BOOK_ID_STRINGFIED}`)
				.send({
					title: updatedTitle,
					coverImageUrl: updatedCoverImageUrl,
					author: MOCKED_AUTHOR_ID_STRINGIFIED,
					genre: MOCKED_GENRE_ID_STRINGFIED,
				})
				.expect(200);

			expect(updatedBook._id).toStrictEqual(MOCKED_BOOK_ID_STRINGFIED);
			expect(updatedBook.title).toBe(updatedTitle);
			expect(updatedBook.coverImageUrl).toBe(updatedCoverImageUrl);
			expect(updatedBook.author).toStrictEqual(
				MOCKED_AUTHOR_WITH_ID_STRINGFIED
			);
			expect(updatedBook.genre).toStrictEqual(MOCKED_GENRE_WITH_ID_STRINGFIED);
		});
		it("should not update a book when an invalid field is provided", async () => {
			await request(app)
				.patch(`/books/${MOCKED_BOOK_ID_STRINGFIED}`)
				.send({
					invalidField: faker.lorem.word(7),
				})
				.expect(500);
		});
		it("should not update a book when an invalid author is provided", async () => {
			await request(app)
				.patch(`/books/${MOCKED_BOOK_ID_STRINGFIED}`)
				.send({
					author: faker.random.uuid(),
				})
				.expect(500);
		});
		it("should not update a book when an invalid genre is provided", async () => {
			await request(app)
				.patch(`/books/${MOCKED_BOOK_ID_STRINGFIED}`)
				.send({
					genre: faker.random.uuid(),
				})
				.expect(500);
		});
	});
	describe("DELETE Requests", () => {
		it("should delete a book", async () => {
			const { body: deletedBook }: { body: BookType } = await request(app)
				.delete(`/books/${MOCKED_BOOK_ID_STRINGFIED}`)
				.expect(200);

			expect(deletedBook._id).toStrictEqual(MOCKED_BOOK_ID_STRINGFIED);
			expect(deletedBook.coverImageUrl).toBe(MOCKED_BOOK.coverImageUrl);
			expect(deletedBook.author).toStrictEqual(
				MOCKED_AUTHOR_ID_STRINGIFIED as any
			);
			expect(deletedBook.genre).toStrictEqual(
				MOCKED_GENRE_ID_STRINGFIED as any
			);
			expect(await Book.findById(MOCKED_BOOK_ID_STRINGFIED)).toBeNull();
		});
	});
});
