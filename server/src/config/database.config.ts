import mongoose from "mongoose";

const main = async () => {
	await mongoose.connect(
		`mongodb+srv://admin:${process.env.MONGODB_DATABASE_PASSOWRD}@smart-library-cluster.1zkye.mongodb.net/smart-library?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		}
	);
};

main();
