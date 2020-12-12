import { Request, Response, Router } from "express";

import Genre from "../../models/genre/genre.model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
	try {
		const {
			query: { withBooks },
		} = req;

		if (withBooks === "true") {
			const genresWithBooks = await Genre.findAllAndPopulateBooksField();
			return res.status(200).send(genresWithBooks);
		}

		const genres = await Genre.find({});
		return res.status(200).send(genres);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.get("/:genreId", async (req: Request, res: Response) => {
	try {
		const {
			params: { genreId },
			query: { withBooks },
		} = req;

		if (withBooks) {
			const genreWithBooks = await Genre.findByIdAndPopulateBooksField(genreId);
			return res.status(200).send(genreWithBooks);
		}

		const genre = await Genre.findById(genreId);
		return res.status(200).send(genre);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.post("/", async (req: Request, res: Response) => {
	try {
		const createdGenre = new Genre(req.body);
		await createdGenre.save();

		return res.status(201).send(createdGenre);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

export default router;
