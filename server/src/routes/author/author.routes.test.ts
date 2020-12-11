import request from "supertest";

import app from "../../app";

import { MOCKED_AUTHOR } from "../../utils/tests.utils";

describe("Author Related Requests", () => {
	describe("Create a author", () => {
		it("should create an author", async () => {
			await request(app).post("/authors").send(MOCKED_AUTHOR).expect(201);
		});
	});
});
