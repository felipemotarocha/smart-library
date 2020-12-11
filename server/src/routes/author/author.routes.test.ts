import request from "supertest";

import app from "../../app";

import Author from "../../models/author/author.model";
import { MOCKED_AUTHOR, MOCKED_AUTHOR_ID } from "../../utils/tests.utils";

describe("Author Related Requests", () => {
	describe("Create a author", () => {
		it("should create an author", async () => {
			await Author.deleteMany({});

			await request(app).post("/authors").send(MOCKED_AUTHOR).expect(201);

			const createdAuthor = await Author.findById(MOCKED_AUTHOR_ID);
			expect(createdAuthor).not.toBeNull();
		});
	});
});
