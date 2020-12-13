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

router.patch("/:genreId", async (req: Request, res: Response) => {
	try {
		const {
			body,
			params: { genreId },
		} = req;

		const validFieldsToUpdate = ["name", "displayName"];
		const receivedFieldsToUpdate = Object.keys(body);

		const receivedFieldsToUpdateAreInvalid = !receivedFieldsToUpdate.every(
			(field) => validFieldsToUpdate.includes(field)
		);

		if (receivedFieldsToUpdateAreInvalid) {
			throw new Error("The provided fields are invalid.");
		}

		const genreToUpdate = await Genre.findById(genreId);
		for (let field of receivedFieldsToUpdate) {
			(genreToUpdate as any)[field] = body[field];
			await genreToUpdate?.save();
		}

		res.status(200).send(genreToUpdate);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.delete("/:genreId", async (req: Request, res: Response) => {
	try {
		const {
			params: { genreId },
		} = req;

		const deletedGenre = await Genre.findByIdAndDelete(genreId);

		res.status(200).send(deletedGenre);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

export default router;
