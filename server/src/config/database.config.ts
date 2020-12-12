import { connect } from "mongoose";

if (process.env.NODE_ENV === "test") {
	connect(process.env.MONGODB_TEST_DATABASE_CONNECTION_STRING!, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	});
}

if (process.env.NODE_ENV === "development") {
	connect(process.env.MONGODB_DEVELOPMENT_DATABASE_CONNECTION_STRING!, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	});
}
