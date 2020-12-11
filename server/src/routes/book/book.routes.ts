import { Request, Response, Router } from "express";
import Book from "../../models/book/book.model";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
	try {
		const books = await Book.find({});
		return res.status(200).send(books);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.post("/", async (req: Request, res: Response) => {
	try {
		const createdBook = new Book(req.body);
		await createdBook.save();

		return res.status(201).send(createdBook);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

export default router;
