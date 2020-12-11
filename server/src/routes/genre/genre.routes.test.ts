import request from "supertest";

import app from "../../app";

import { MOCKED_GENRE } from "../../utils/tests.utils";

describe("Genre Related Requests", () => {
	describe("Create a genre", () => {
		it("should create a genre", async () => {
			await request(app).post("/genres").send(MOCKED_GENRE).expect(201);
		});
	});
});
