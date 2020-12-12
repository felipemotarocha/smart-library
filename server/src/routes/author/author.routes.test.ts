import request from "supertest";

import app from "../../app";

import Author from "../../models/author/author.model";
import { Author as AuthorType } from "../../types/author.types";
import {
	MOCKED_AUTHOR,
	MOCKED_AUTHOR_ID,
	MOCKED_AUTHOR_ID_STRINGIFIED,
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
			expect(firstAuthor._id).toBe(MOCKED_AUTHOR_ID_STRINGIFIED);
			expect(firstAuthor.name).toBe(MOCKED_AUTHOR.name);
		});
		it("should get all the authors with their books", async () => {
			const { body: authors }: { body: AuthorType[] } = await request(app)
				.get("/authors")
				.expect(200);

			const firstAuthor = authors[0];

			expect(authors).toBeDefined();
			expect(firstAuthor).toBeDefined();
			expect(firstAuthor._id).toBe(MOCKED_AUTHOR_ID_STRINGIFIED);
			expect(firstAuthor.name).toBe(MOCKED_AUTHOR.name);
		});
	});
});
