import { Document, Model } from "mongoose";

export interface IUserDocument extends Document {
	name: string;
	email: string;
	password: string;
}

export interface IUserModel extends Model<IUserDocument> {}
