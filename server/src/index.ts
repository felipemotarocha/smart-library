import dotenv from "dotenv";
dotenv.config();

import express from "express";
import "./config/database.config";

const app = express();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}!`));
