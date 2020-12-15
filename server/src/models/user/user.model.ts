import { Schema, model, Model } from "mongoose";
import bcrypt from "bcryptjs";

import { IUserDocument, IUserModel } from "./user.model.types";
import { IBookDocument } from "../book/book.model.types";

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		versionKey: process.env.NODE_ENV === "test" && false,
	}
);

userSchema.pre("save", async function (this: IUserDocument, next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 8);
	}

	next();
});

const User = model<IUserDocument, IUserModel>("User", userSchema);

export default User;
