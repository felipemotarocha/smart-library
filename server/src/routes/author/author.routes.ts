import { Request, Response, Router } from "express";
import Author from "../../models/author/author.model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
	try {
		const {
			query: { withBooks },
		} = req;

		if (withBooks === "true") {
			const authorsWithBooks = await Author.find({}).populate("books");
			return res.status(200).send(authorsWithBooks);
		}

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

router.patch("/:authorId", async (req: Request, res: Response) => {
	try {
		const {
			body,
			params: { authorId },
		} = req;

		const validFieldsToUpdate = ["name", "displayName"];
		const receivedFieldsToUpdate = Object.keys(body);

		const receivedFieldsToUpdateAreInvalid = !receivedFieldsToUpdate.every(
			(field) => validFieldsToUpdate.includes(field)
		);

		if (receivedFieldsToUpdateAreInvalid) {
			throw new Error("The provided fields are invalid.");
		}

		const authorToUpdate = await Author.findById(authorId);
		for (let field of receivedFieldsToUpdate) {
			(authorToUpdate as any)[field] = body[field];
			await authorToUpdate?.save();
		}

		res.status(200).send(authorToUpdate);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.delete("/:authorId", async (req: Request, res: Response) => {
	try {
		const {
			params: { authorId },
		} = req;

		const deletedAuthor = await Author.findByIdAndDelete(authorId);

		res.status(200).send(deletedAuthor);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

export default router;
