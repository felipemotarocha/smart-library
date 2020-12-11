declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production" | "test";
			MONGODB_DEVELOPMENT_DATABASE_CONNECTION_STRING?: string;
			MONGODB_TEST_DATABASE_CONNECTION_STRING?: string;
			PORT?: string;
		}
	}
}

export {};
