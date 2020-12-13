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

router.get("/:bookId", async (req: Request, res: Response) => {
	try {
		const {
			params: { bookId },
		} = req;
		const book = await Book.findById(bookId);

		return res.status(200).send(book);
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

router.patch("/:bookId", async (req: Request, res: Response) => {
	try {
		const {
			body,
			params: { bookId },
		} = req;

		const validFieldsToUpdate = ["title", "coverImageUrl", "author", "genre"];
		const receivedFieldsToUpdate = Object.keys(body);

		const receivedFieldsToUpdateAreInvalid = !receivedFieldsToUpdate.every(
			(field) => validFieldsToUpdate.includes(field)
		);

		if (receivedFieldsToUpdateAreInvalid)
			throw new Error("The provided fields are invalid.");

		const authorIsBeingUpdated = receivedFieldsToUpdate.includes("author");
		if (authorIsBeingUpdated) {
			const authorId = body["author"];
			const author = await Author.findById(authorId);
			if (!author) throw new Error("Please provide a valid author.");
		}

		const genreIsBeingUpdated = receivedFieldsToUpdate.includes("genre");
		if (genreIsBeingUpdated) {
			const genreId = body["genre"];
			const genre = await Genre.findById(genreId);
			if (!genre) throw new Error("Please provide a valida genre.");
		}

		const bookToUpdate = await Book.findById(bookId);
		for (let field of receivedFieldsToUpdate) {
			(bookToUpdate as any)[field] = body[field];
			await bookToUpdate?.save();
		}

		res.status(200).send(bookToUpdate);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.delete("/:bookId", async (req: Request, res: Response) => {
	try {
		const {
			params: { bookId },
		} = req;

		const deletedBook = await Book.findByIdAndDelete(bookId);

		res.status(200).send(deletedBook);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

export default router;
