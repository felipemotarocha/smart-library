import request from "supertest";

import app from "../../app";

import { MOCKED_BOOK } from "../../utils/tests.utils";

describe("Books Related Requests", () => {
	describe("Create a book", () => {
		it("should create a book", async () => {
			await request(app).post("/books").send(MOCKED_BOOK).expect(201);
		});
	});
});
