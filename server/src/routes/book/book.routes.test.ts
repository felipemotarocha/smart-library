import request from "supertest";

import app from "../../app";

import {
	MOCKED_AUTHOR,
	MOCKED_BOOK,
	MOCKED_GENRE,
} from "../../utils/tests.utils";

describe("Books Related Requests", () => {
	describe("Create a book", () => {
		it("should create a book", async () => {
			await request(app).post("/authors").send(MOCKED_AUTHOR).expect(201);
			await request(app).post("/genres").send(MOCKED_GENRE).expect(201);
			await request(app).post("/books").send(MOCKED_BOOK).expect(201);
		});
	});
});
