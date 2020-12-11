import mongoose from "mongoose";

const main = async () => {
	let CONNECTION_STRING = "";

	if (process.env.NODE_ENV === "test")
		CONNECTION_STRING = process.env.MONGODB_TEST_DATABASE_CONNECTION_STRING!;

	if (process.env.NODE_ENV === "development")
		CONNECTION_STRING = process.env
			.MONGODB_DEVELOPMENT_DATABASE_CONNECTION_STRING!;

	await mongoose.connect(CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	});
};

main();
