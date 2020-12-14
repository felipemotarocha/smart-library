import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
import "./config/database.config";

import { default as BooksRouter } from "./routes/book/book.routes";
import { default as AuthorsRouter } from "./routes/author/author.routes";
import { default as GenresRouter } from "./routes/genre/genre.routes";

const app = express();
app.use(bodyParser.json());
app.use((cors as any)());

app.use("/books", BooksRouter);
app.use("/authors", AuthorsRouter);
app.use("/genres", GenresRouter);

export default app;
