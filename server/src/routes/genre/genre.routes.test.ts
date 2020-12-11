import request from "supertest";

import app from "../../app";
import Genre from "../../models/genre/genre.model";

import { MOCKED_GENRE, MOCKED_GENRE_ID } from "../../utils/tests.utils";

describe("Genre Related Requests", () => {
	describe("Create a genre", () => {
		it("should create a genre", async () => {
			await Genre.deleteMany({});

			await request(app).post("/genres").send(MOCKED_GENRE).expect(201);
			const createdGenre = await Genre.findById(MOCKED_GENRE_ID);
			expect(createdGenre).not.toBeNull();
		});
	});
});
