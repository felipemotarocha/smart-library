import { Request, Response, Router } from "express";
import Author from "../../models/author/author.model";
import Book from "../../models/book/book.model";
import Genre from "../../models/genre/genre.model";

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
		const {
			body: { author, genre },
		} = req;

		const authorExists = await Author.findById(author);
		if (!authorExists)
			throw new Error("Please enter a valid author for the book.");

		const genreExists = await Genre.findById(genre);
		if (!genreExists)
			throw new Error("Please enter a valid genre for the book.");

		const createdBook = new Book(req.body);
		await createdBook.save();

		return res.status(201).send(createdBook);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

export default router;
