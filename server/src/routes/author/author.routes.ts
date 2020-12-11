import { Request, Response, Router } from "express";
import Author from "../../models/author/author.model";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
	try {
		const authors = await Author.find({});
		return res.status(200).send(authors);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.post("/", async (req: Request, res: Response) => {
	try {
		const createdAuthor = new Author(req.body);
		await createdAuthor.save();

		return res.status(201).send(createdAuthor);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

export default router;
